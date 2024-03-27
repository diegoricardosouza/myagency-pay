<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function auth(Request $request)
    {
        if(Auth::attempt($request->only('email', 'password'))) {
            $request->user()->tokens()->delete();

            return response()->json([
                'message' => 'Authorized',
                'token' => $request->user()->createToken('myagency')->plainTextToken
            ], 200);
        }

        return response()->json(['message' => 'Unauthorized'], 401);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Token Revoked'], 200);
    }
}
