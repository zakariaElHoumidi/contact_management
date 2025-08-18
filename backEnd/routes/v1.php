<?php

use App\Http\Controllers\api\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/**
 * Forme générale :
 * Route::name("")->middleware([])->prefix("")->group(function () {
 *      Direct Route:
 *      Route::get('', [NameController::class, 'func'])->name('');
 *      Route::post('', [NameController::class, 'func'])->name('');
 *
 *      OR SubGroup:
 *      Route::name("")->middleware([])->prefix("")->group(function () {
 *          Route::get('', [NameController::class, 'func'])->name('');
 *      });
 * });
 */

Route::prefix("auth")->group(function () {
    Route::middleware('guest')->group(function () {
        Route::post('login', [AuthController::class, 'login'])->name('login');
        Route::post('register', [AuthController::class, 'register'])->name('register');
    });
    Route::get('isAuth', [AuthController::class, 'isAuth'])->name('isAuth');
    Route::post('logout', [AuthController::class, 'logout'])->name('logout')->middleware('auth:sanctum');
});
