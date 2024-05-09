<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Music;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use App\Models\Album;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
use App\Models\Genre;
use Illuminate\Support\Facades\Storage;

class MusicController extends Controller
{
    
    public function uploadMusic(Request $request)
    {
        // Validate the incoming request
        $request->validate([
            'id' => 'required',
            'albumCover' => 'required',
            'albumTitle' => 'required',
            'tracksInfo' => 'required|array', // Ensure tracksInfo is an array
            'tracksInfo.*.fileName' => 'required|string', // Ensure each track has a name
            'tracksInfo.*.genres' => 'required|array', // Ensure each track has a genre
            'tracksInfo.*.genres.*' => 'string', // Ensure each genre is a string
            'tracks.*' => 'file|mimes:mp3,wav|size:400000', // Validate each track file as mp3
        ]);

        $artistId = $request->id;
        
        // Get the album cover from the request
        $albumCover = $request->file('albumCover');

        // Generate a unique name for the album cover
        $albumCoverFileName = time() . '.' . $albumCover->getClientOriginalExtension();

        // Define the destination directory
        $destinationPath = public_path('storage/album_covers');

        // Move the album cover to the destination directory with the generated filename
        $albumCover->move($destinationPath, $albumCoverFileName);

        // Save the album details to the database
        $album = new Album(); 
        $album->title = $request->input('albumTitle');
        $album->description = $request->input('albumDescription', ''); // albumDescription is optional
        $album->artist = $artistId; // Assuming there's a default artist ID
        $album->cover_image = url('/storage/album_covers/' . $albumCoverFileName); // Get the public URL of the stored file
        $album->save();

        $albumId = $album->id;


        // Get the tracks from the request
        $tracks = $request->file();

        $iterator = 0;

        // Save each track to the database
        foreach ($tracks as $key => $trackFile) {
            // Generate a unique name for the track file
            $randomString = Str::random(10); // Generate a random string
            $timestamp = time(); // Get the current timestamp
            $trackFileName = "{$timestamp}_{$randomString}.{$trackFile->extension()}";
            $originalFileName = $trackFile->getClientOriginalName();
        
            $info = $request->tracksInfo[$iterator];
            $fileNameFromInfo = $info['fileName'];
            
            // Move the track file to the desired directory
            $trackFile->move(public_path('/music/'), $trackFileName);
            
            // Save the track details to the database
            $music = new Music();
            $music->title = $fileNameFromInfo; // You can set the title to the filename for simplicity, or extract metadata if available
            $music->album_id = $album->id; // Assuming you have an album ID
            $music->file_name = url('/music/' . $trackFileName); // Save the file path
            $music->duration = $info['duration'];
            $music->artist_id = $artistId; // Assuming there's a default artist ID
            $music->save();
        
             // Attach genres to the music track
            foreach ($info['genres'] as $genreName) {
                $genre = Genre::firstOrCreate(['name' => $genreName]);
                $music->genres()->attach($genre); // Corrected method call
            }
        
            $iterator++;
            if ($iterator >= count($request->input('tracksInfo'))) {
                break;
            }
        }
                
        
        // // Access tracksInfo from the request
        // $tracksInfo = $request->input('tracksInfo');
        
        // // Process each track
        // foreach ($tracksInfo as $info) {
        //     // Get the music file for the current track
        //     $musicFile = $info['file']; // Assuming the file is included in the tracksInfo
        
        //     // Generate a unique name for the music file
        //     $musicFileName = time() . '.' . $musicFile->extension();
        
        //     // Move the music file to the public directory
        //     $musicFile->move(public_path('/music/'), $musicFileName);
        
        //     // Save the music details to the database
        //     $musicModel = new Music();
        //     $musicModel->title = $info['name'];
        //     $musicModel->album_id = $album->id;
        //     $musicModel->file_name = url('/music/' . $musicFileName); // Save the file path
        //     $musicModel->artist_id = 1; // Assuming there's a default artist ID
        //     $musicModel->save();
        
        //     // Attach genres to the music track
        //     foreach ($info['genre'] as $genreName) {
        //         $genre = Genre::firstOrCreate(['name' => $genreName]);
        //         $musicModel->genres()->attach($genre);
        //     }
        // }
        

        // // Get the tracks and track metadata from the request
        // $tracksInfo = $request->input('tracksInfo');
        // $tracks = $request->file('tracks');
        
        // // Save each track to the database
        // foreach ($tracks as $key => $trackFile) {
        //     // Extract track metadata from the tracksInfo array
        //     $info = $tracksInfo[$key];
        //     $genresForTrack = $info['genre'];

        //     // Generate a unique name for the track file
        //     $trackFileName = time() . '.' . $trackFile->extension();
            
        //     // Move the track file to the public directory
        //     $trackFile->move(public_path('/music/'), $trackFileName);
            
        //     // Save the track details to the database
        //     $music = new Music();
        //     $music->title = $info['name'];
        //     $music->album_id = $album->id;
        //     $music->file_name = '/music/' . $trackFileName; // Save the file path
        //     $music->artist_id = 1; // Assuming there's a default artist ID
        //     $music->save();
            
        //     // Attach genres to the track
        //     foreach ($genresForTrack as $genreName) {
        //         $genre = Genre::firstOrCreate(['name' => $genreName]);
        //         $music->genres()->attach($genre);
        //     }
        // }

        return response()->json(['message' => "Album Uploaded Successfully", 'albumId' => $albumId], 200);
    }

    public function getAllMusic()
    {
        // Retrieve all music records from the database
        $music = Music::all();

        // Loop through each music record and replace the artist ID with the user's name
        foreach ($music as $song) {
            $user = User::find($song->artist);
            if ($user) {
                $song->artist = $user->name;
            } else {
                // If user is not found, set artist to null or any default value
                $song->artist = null; // You can replace null with any default value
            }
        }

        // Return the modified music data as JSON response
        return response()->json($music, 200);
    }

    public function getAlbumWithMusic($albumId)
    {
        // Retrieve the album with its related music by its ID
        $album = Album::with('music')->findOrFail($albumId);

        return response()->json($album);
    }

   public function fetchMusic(Request $request)
{
    // Validate the incoming request
    $request->validate([
        'album_id' => 'required|exists:albums,id', // Ensure the provided album ID exists in the albums table
    ]);

    // Retrieve the album cover URL based on the provided album ID
    $album = Album::findOrFail($request->album_id);
    $albumCover = $album->cover_image;

    // Retrieve all music records that belong to the provided album ID
    $music = Music::where('album_id', $request->album_id)->get();

    foreach ($music as $song) {
        // Retrieve the artist name from the users table based on the artist_id
        $artist = User::find($song->artist_id);
        // Add the artist name to the music record
        $song->artist = $artist ? $artist->name : "Unknown"; // Assign artist's name or "Unknown" if not found
        // Add the album cover URL to the music record
        $song->album_cover = $albumCover;
    }

    // Return the music records along with the album cover URL as JSON response
    return response()->json($music, 200);
}

public function delete(Request $request)
{
    $request->validate([
        'id' => 'required'
    ]);

    Music::destroy($request->id);

    return response()->json(["message" => "Music Deleted Successfully!"], 200);
}

    

}
