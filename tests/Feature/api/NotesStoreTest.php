<?php

namespace Tests\Feature\api;

use App\Models\Note;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Str;
use Tests\TestCase;

class NotesStoreTest extends TestCase
{
    use RefreshDatabase;

    private function getCreatedNote(): Note
    {
        return Note::query()->first();
    }

    public function testStoreSuccess(): void
    {
        $note = [
            'data' => base64_encode('Node=Body')
        ];

        $response = $this->post('/api/notes', $note);
        $noteCreated = $this->getCreatedNote();

        $response
            ->assertStatus(201)
            ->assertJson(
                $noteCreated->makeHidden('data')->toArray()
            );
    }

    public function testStoreWithExpirationDateSuccess(): void
    {
        $note = [
            'data' => base64_encode('Node=Body'),
            'expiration' => 'day'
        ];

        $response = $this->post('/api/notes', $note);
        $noteCreated = $this->getCreatedNote();

        $response->assertStatus(201);
        $this->assertNotNull($noteCreated->expiration_date);
    }

    public function testStoreWithEmailSuccess(): void
    {
        $note = [
            'data' => base64_encode('Node=Body'),
            'email' => 'email@email.com'
        ];

        $response = $this->post('/api/notes', $note);
        $noteCreated = $this->getCreatedNote();

        $response->assertStatus(201);
        $this->assertEquals($noteCreated->email, $note['email']);
    }

    public function testBodyLongThrowError(): void
    {
        $note = [
            'data' => base64_encode(Str::random(15000)),
        ];

        $response = $this->post('/api/notes', $note);

        $response
            ->assertStatus(422)
            ->assertJson([
                'errors' => [
                    'data' => [__('The data field must not be greater than 10000 characters.')]
                ]
            ]);
    }

    public function testBodyIncorrectDecodeThrowError(): void
    {
        $note = [
            'data' => 'Node=Body',
        ];

        $response = $this->post('/api/notes', $note);

        $response
            ->assertStatus(422)
            ->assertJson([
                'errors' => [
                    'data' => [__('The data must be a valid base64 encoded string')]
                ]
            ]);
    }

    public function testExpirationIncorrectThrowError(): void
    {
        $note = [
            'data' => base64_encode('Node=Body'),
            'expiration' => 'minute'
        ];

        $response = $this->post('/api/notes', $note);

        $response
            ->assertStatus(422)
            ->assertJson([
                'errors' => [
                    'expiration' => [__('The selected expiration is invalid.')]
                ]
            ]);
    }

    public function testEmailIncorrectThrowError(): void
    {
        $note = [
            'data' => base64_encode('Node=Body'),
            'email' => 'email@'
        ];

        $response = $this->post('/api/notes', $note);

        $response
            ->assertStatus(422)
            ->assertJson([
                'errors' => [
                    'email' => [__('The email field must be a valid email address.')]
                ]
            ]);
    }

}
