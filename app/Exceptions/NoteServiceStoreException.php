<?php


namespace App\Exceptions;

use App\Enums\ErrorEnum;
use Illuminate\Http\JsonResponse;

/**
 * NoteServiceStoreException is thrown when an error occurs while trying to create a new note.
 *
 * @package App\Exceptions
 */

class NoteServiceStoreException extends \Exception
{
    /**
     * @return JsonResponse
     */
    public function render(): JsonResponse
    {
        return response()->json(['errors' => ['message' => ErrorEnum::NOTE_CREATE]], 500);
    }
}
