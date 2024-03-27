<?php

use App\Http\Controllers\Api\v1\AuthController;
use App\Http\Controllers\Api\v1\PlanController;
use App\Http\Controllers\Api\v1\UserController;
use Illuminate\Support\Facades\Route;

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::prefix('v1')->group(function() {
    Route::post('/login', [AuthController::class, 'auth']);
    // Route::get('/users', [UserController::class, 'index']);
    // Route::get('/plans', [PlanController::class, 'index']);
    // Route::post('/plans', [PlanController::class, 'store']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::apiResource('/plans', PlanController::class);
        Route::apiResource('/users', UserController::class);
    });



    // Route::post('/users/{id}', [UserController::class, 'update']);
});

