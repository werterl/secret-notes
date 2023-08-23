<?php


namespace App\Contracts;


use Illuminate\Support\Carbon;

interface NotificationServiceInterface
{
    public function send(string $note_id, string $email, Carbon $dateRead);
}
