<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->query('search');
        $status = $request->query('status');

        return Task::query()
            ->when($search, function ($query) use ($search) {
                $query->where(function ($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
                });
            })
            ->when($status === "completed", function ($query) {
                $query->where('completed', true);
            })
            ->when($status === "pending", function ($query) {
                $query->where('completed', false);
            })
            ->orderBy('deadline', 'desc')
            ->paginate(10);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'completed' => 'boolean',
            'deadline' => 'required|date',
        ]);

        $task = Task::create($validated);

        return response()->json($task, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        $task = Task::findOrFail($id);
        return $task;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // Fetch task or fail
        $task = Task::findOrFail($id);

        // Validate incoming request
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'completed' => 'sometimes|boolean',
            'deadline' => 'required|date',
        ]);

        $task->update($validated);

        return response()->json($task);
    }

        /**
         * Remove the specified resource from storage.
         */
        public function destroy(int $id)
        {
            
        // Fetch task or fail
        $task = Task::findOrFail($id);

        // Delete the task
        $task->delete();

        // Return empty response with 204 status
        return response()->json(null, 204);
    }
}
