<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\StoreUpdateUserRequest;
use App\Http\Resources\Api\UserResource;
use App\Services\UserService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function __construct(
        protected UserService $userRepository,
    ) { }

    public function auth(Request $request)
    {
        if(Auth::attempt($request->only('email', 'password'))) {
            $request->user()->tokens()->delete();

            return response()->json([
                'token' => $request->user()->createToken('myagency')->plainTextToken
            ], Response::HTTP_OK);
        }

        return response()->json(['message' => 'Unauthorized'], Response::HTTP_UNAUTHORIZED);
    }

    public function me()
    {
        $user = Auth::user();
        return new UserResource($user);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json([], Response::HTTP_NO_CONTENT);
    }

    public function store(StoreUpdateUserRequest $request)
    {
        // $this->verifyUserLogged();

        $user = $this->userRepository->createNew($request->all());
        return new UserResource($user);
    }
}
