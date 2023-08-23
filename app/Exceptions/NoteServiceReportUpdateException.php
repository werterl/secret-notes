<?php


namespace App\Exceptions;

use App\Enums\ErrorEnum;
use Illuminate\Http\JsonResponse;

/**
 * NoteServiceReportUpdateException is thrown when an error occurs while trying to update the email_report_sent field.
 *
 * @package App\Exceptions
 */

class NoteServiceReportUpdateException extends \Exception
{
    /**
     * @return JsonResponse
     */
    public function render(): JsonResponse
    {
        return response()->json(['errors' => ['message' => ErrorEnum::NOTE_EMAIL_REPORT_UPDATE]], 500);
    }
}
