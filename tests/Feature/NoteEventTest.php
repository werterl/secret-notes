<?php

namespace Tests\Feature;

use App\Events\NoteOpenEvent;
use App\Models\Note;
use App\Services\NoteService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Str;
use Tests\TestCase;

class NoteEventTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp(); // TODO: Change the autogenerated stub
        Event::fake();
    }

    /**
     * @throws \App\Exceptions\NoteServiceReportUpdateException
     */
    public function testNoteOpenAndSetEmailReportSentTrueEvent(): void
    {
        $noteCreated = Note::factory()->create(['id' => Str::uuid(), 'email_report_sent' => false]);

        $noteService = new NoteService();
        $noteService->openNote($noteCreated);

        Event::assertDispatched(NoteOpenEvent::class);
        $this->assertTrue($noteCreated->fresh()->email_report_sent);
    }

    /**
     * @throws \App\Exceptions\NoteServiceReportUpdateException
     */
    public function testNoteOpenEventSendTrueThrowError(): void
    {
        $noteCreated = Note::factory()->create(['id' => Str::uuid(), 'email_report_sent' => true]);

        $noteService = new NoteService();
        $noteService->openNote($noteCreated);

        Event::assertNotDispatched(NoteOpenEvent::class);
    }

    /**
     * @throws \App\Exceptions\NoteServiceReportUpdateException
     */
    public function testNoteOpenEventEmailNullThrowError(): void
    {
        $noteCreated = Note::factory()->create(['id' => Str::uuid(), 'email_report_sent' => false, 'email' => null]);

        $noteService = new NoteService();
        $noteService->openNote($noteCreated);

        Event::assertNotDispatched(NoteOpenEvent::class);
    }
}
