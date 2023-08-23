<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Notes\DestroyNoteRequest;
use App\Http\Requests\Notes\StoreNoteRequest;
use App\Models\Note;
use App\Services\NoteService;
use Illuminate\Http\JsonResponse;

/**
 * Class NoteController
 * @package App\Http\Controllers\Api
 */
class NoteController extends Controller
{
    /**
     * NoteController constructor.
     * @param  NoteService  $noteService
     */
    public function __construct(public NoteService $noteService)
    {
    }

    /**
     * Show details of a note and mark it as opened
     * @param  Note  $note
     * @return JsonResponse
     * @throws \App\Exceptions\NoteServiceReportUpdateException
     */
    public function show(Note $note): JsonResponse
    {
        // Mark the note as opened if it happened for the first time
        $this->noteService->openNote($note);

        // Return the note details as JSON
        return response()->json($note);
    }

    /**
     * Display the expiration date of a note. This information is used to show a warning if the note is deleted after being opened.
     * If the expiration_date is null, a warning message will be displayed indicating that the note will be deleted after viewing.
     * @param  Note  $note
     * @return JsonResponse
     */
    public function info(Note $note): JsonResponse
    {
        // Return the expiration date of the note as JSON
        return response()->json($note->only('expiration_date'));
    }

    /**
     * Store a new note
     * @param  StoreNoteRequest  $request
     * @return JsonResponse
     * @throws \App\Exceptions\NoteServiceStoreException
     */
    public function store(StoreNoteRequest $request): JsonResponse
    {
        // Validate and create a new note
        $data = $request->validated();
        $note_created = $this->noteService->createNote($data);

        // Return the part of created note details (without body) as JSON
        return response()->json($note_created->only('id', 'delete_token', 'expiration_date'), 201);
    }

    /**
     * Delete a note using the provided delete token
     * @param  DestroyNoteRequest  $request
     * @param  Note  $note
     * @return JsonResponse
     * @throws \App\Exceptions\NoteServiceDestroyAccessException
     * @throws \App\Exceptions\NoteServiceDestroyException
     */
    public function destroy(DestroyNoteRequest $request, Note $note): JsonResponse
    {
        // Validate delete_token and delete the note
        $delete_token = $request->validated('delete_token');
        $this->noteService->deleteNote($delete_token, $note);

        // Return an empty JSON response
        return response()->json([], 204);
    }
}
