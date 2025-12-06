<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;

Route::prefix('tasks')->group(function () {
    Route::get('/', [TaskController::class, 'index']);       // GET /api/tasks
    Route::get('/{id}', [TaskController::class, 'show']);  // GET /api/tasks/{task}
    Route::post('/', [TaskController::class, 'store']);      // POST /api/tasks
    Route::put('/{id}', [TaskController::class, 'update']); // PUT /api/tasks/{task}
    Route::delete('/{id}', [TaskController::class, 'destroy']); // DELETE /api/tasks/{task}
});

