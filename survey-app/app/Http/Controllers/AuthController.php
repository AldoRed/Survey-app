<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Illuminate\Support\Facades\Auth;
use App\Models\User;


class AuthController extends Controller
{
    public function register(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:100'],
            'email' => ['required', 'email', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8', 'confirmed', Password::min(8)->letters()->numbers()],
        ]);
        
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        $token = $user->createToken('main')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
        ]);
    }

    public function login(Request $request){

        $credentials = $request->validate([
            'email' => 'required|email|exists:users,email',
            'password' => ['required', 'string'],
            'remember' => ['boolean'],
        ]);
        $remember = $credentials['remember'] ?? false;
        unset($credentials['remember']);

        $user = User::where('email', $credentials['email'])->first();

        if(!$user || !Hash::check($credentials['password'], $user->password)){
            return response()->json([
                'message' => 'The provided credentials are incorrect.'
            ], 422);
        }

        $token = $user->createToken('main')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
        ]);

    }

    public function logout(Request $request){
        $user = Auth::user();
        $user->currentAccessToken()->delete();

        return response()->json([
            'success' => true,
        ]);
    }
}