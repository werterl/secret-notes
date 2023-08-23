<?php


namespace App\Services;


use App\Contracts\NotificationServiceInterface;
use App\Mail\NoteMail;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Mail;

/**
 * Send a notification email for the given note with the provided read date.
 * Class NotificationService
 * @package App\Services
 */
class NotificationService implements NotificationServiceInterface
{
    /**
     * @param  string  $note_id
     * @param  string  $email
     * @param  Carbon  $dateRead
     */
    public function send(string $note_id, string $email, Carbon $dateRead)
    {
        // Use the NoteMail mailer to send the notification email
        Mail::to($email)->send(new NoteMail($note_id, $dateRead));
    }
}
