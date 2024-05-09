<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserManagementController extends Controller
{
    public function fetchUsers(){
        $users = User::all()->makeHidden(['remember_token', 'updated_at']);

        // Format the 'created_at' column using Carbon
        $users->transform(function ($user) {
            
            // Capitalize the first letter of 'user_type'
            $user->user_type = ucfirst($user->user_type);
            // Capitalize the first letter of 'status'
            $user->status = ucfirst($user->status);
            return $user;
        });

        return response()->json($users);
    }
}
