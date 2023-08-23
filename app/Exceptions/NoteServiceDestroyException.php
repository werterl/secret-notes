<?php


namespace App\Exceptions;

use App\Enums\ErrorEnum;
use Illuminate\Http\JsonResponse;

/**
 * NoteServiceDestroyException is thrown when an error occurs while trying to destroy a note.
 *
 * @package App\Exceptions
 */

class NoteServiceDestroyException extends \Exception
{
    /**
     * @return JsonResponse
     */
    public function render(): JsonResponse
    {
        return response()->json(['errors' => ['message' => ErrorEnum::NOTE_DESTROY]], 500);
    }
}
