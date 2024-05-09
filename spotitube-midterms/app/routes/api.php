<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\UserController;
use App\Http\Controllers\EmailController;
use App\Http\Controllers\UserManagementController;
use App\Http\Controllers\MusicController;
use App\Http\Controllers\AlbumController;
use App\Http\Controllers\ArtistRequestController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/register', [AuthController::class, 'register'])->name('register');
Route::post('/login', [AuthController::class, 'login'])->name('login');


// API Endpoints for email verification
Route::get('/verify/{id}', [EmailController::class, 'verifyEmail']);
Route::get('/resend/{id}', [EmailController::class, 'resendEmail']);

// Artist Request
Route::post('/artist_request', [ArtistRequestController::class, 'create']);
Route::post('/artist-status', [ArtistRequestController::class, 'showStatus']);
Route::get('/fetch_requests', [ArtistRequestController::class, 'index']);
Route::get('/artist_requests/{id}', [ArtistRequestController::class, 'reject']);
Route::post('/approve_artist_requests', [ArtistRequestController::class, 'approve']);

//Verify if user is logged in
Route::post('verifyUser', [AuthController::class, 'verify']);

// Upload Music
Route::post('/music', [MusicController::class, 'uploadMusic']);
// Fetch all music
Route::get('/all_music', [MusicController::class, 'getAllMusic']);

Route::get('/fetchMusic', [MusicController::class, 'fetchMusic']);
Route::get('/music/delete/{id}', [MusicController::class, 'delete']);

// Album Controllers
Route::get('/album/all', [AlbumController::class, 'index']);
Route::post('/album/delete', [AlbumController::class, 'delete']);
Route::post('/album/update', [AlbumController::class, 'update']);

Route::get('/albums/{albumId}', [MusicController::class, 'getAlbumWithMusic']);

Route::get('/user_management/all', [UserManagementController::class, 'fetchUsers']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);
});
