<?php

use App\Http\Controllers\Api\NoteController;
use Illuminate\Support\Facades\Route;

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

Route::prefix('notes')->group(function () {
    Route::post('/', [NoteController::class, 'store'])
        ->middleware('throttle:5,1')
        ->name('notes.store');

    Route::delete('/{note}', [NoteController::class, 'destroy'])
        ->name('notes.destroy');

    Route::get('/{note}', [NoteController::class, 'show'])
        ->name('notes.show');

    Route::get('/{note}/info', [NoteController::class, 'info'])
        ->name('notes.info');
});

