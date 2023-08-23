<?php


namespace App\Exceptions;

use App\Enums\ErrorEnum;
use Illuminate\Http\JsonResponse;

/**
 * NoteServiceDestroyAccessException is thrown when there is an attempt to destroy a note without proper access.
 *
 * @package App\Exceptions
 */

class NoteServiceDestroyAccessException extends \Exception
{
    /**
     * @return JsonResponse
     */
    public function render(): JsonResponse
    {
        return response()->json(['errors' => ['message' => ErrorEnum::ACCESS_NOTE]], 403);
    }
}
