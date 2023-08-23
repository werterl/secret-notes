<?php

namespace App\Listeners;

use App\Contracts\NotificationServiceInterface;
use App\Events\NoteOpenEvent;
use Illuminate\Contracts\Queue\ShouldQueue;

/**
 * Class NoteOpenListener
 * @package App\Listeners
 */
class NoteOpenListener implements ShouldQueue
{
    /**
     * Create the event listener.
     */
    public function __construct(public NotificationServiceInterface $notificationService)
    {
    }

    /**
     * Add a task to the queue to send the notification email.
     * @param  NoteOpenEvent  $event
     */
    public function handle(NoteOpenEvent $event): void
    {
        $this->notificationService->send($event->note_id, $event->email, $event->dateRead);
    }

    public string $queue = 'note_open_listener';
}
