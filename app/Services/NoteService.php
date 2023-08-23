<?php


namespace App\Services;

use App\Events\NoteOpenEvent;
use App\Exceptions\NoteServiceDestroyAccessException;
use App\Exceptions\NoteServiceDestroyException;
use App\Exceptions\NoteServiceReportUpdateException;
use App\Exceptions\NoteServiceStoreException;
use App\Models\Note;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Arr;
use Carbon\Carbon;
use Illuminate\Support\Str;

/**
 * NoteService class provides methods for working with Note models.
 *
 * @package App\Services
 */
class NoteService
{

    /**
     * Open the given note and dispatch the NoteOpenEvent if conditions are met.
     * @param  Note  $note
     * @throws NoteServiceReportUpdateException
     */
    public function openNote(Note $note): void
    {
        if (!is_null($note->email) && !$note->email_report_sent) {
            NoteOpenEvent::dispatch($note->id, $note->email, now());
            try {
                $note->update(['email_report_sent' => true]);
            } catch (\Exception $e) {
                throw new NoteServiceReportUpdateException($e->getMessage());
            }
        }
    }

    /**
     * Delete the note with the specified delete_token, if authorized.
     * @param  string  $delete_token
     * @param  Note  $note
     * @return bool
     * @throws NoteServiceDestroyAccessException
     * @throws NoteServiceDestroyException
     */
    public function deleteNote(string $delete_token, Note $note): bool
    {
        if ($note->delete_token == $delete_token) {
            try {
                return $note->delete();
            } catch (\Exception $e) {
                throw new NoteServiceDestroyException($e->getMessage());
            }
        } else {
            throw new NoteServiceDestroyAccessException();
        }
    }

    /**
     * Create a new note with the provided data.
     * @param  array  $data
     * @return Model
     * @throws NoteServiceStoreException
     */
    public function createNote(array $data): Model
    {
        $data['delete_token'] = $this->generateDeleteToken();

        if (Arr::has($data, 'expiration')) {
            $data['expiration_date'] = Carbon::now()->add(1, $data['expiration']);
        }

        try {
            return Note::query()->create($data);
        } catch (\Exception $e) {
            throw new NoteServiceStoreException($e->getMessage());
        }
    }

    /**
     * @return string
     */
    private function generateDeleteToken(): string
    {
        return Str::random(20);
    }
}
