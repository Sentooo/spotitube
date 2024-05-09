<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Genre;


class Music extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title',
        'album',
        'music_file_name',
    ];

    public function artist()
    {
        return $this->belongsTo(User::class, 'artist');
    }
    public function genres()
    {
        return $this->belongsToMany(Genre::class, 'music_genre', 'music_id', 'genre_id');
    }
}
