<?php

namespace Tests\Feature\Console;

use App\Models\Note;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Carbon;
use Tests\TestCase;

class DeleteExpiredNotesCommandTest extends TestCase
{
    use RefreshDatabase;

    public function testDeleteExpiredNotesCommand(): void
    {
        Note::factory()->create(['expiration_date' => Carbon::now()->subDay()]);
        Note::factory()->create(['expiration_date' => Carbon::now()->addDay()]);
        Note::factory()->create(['expiration_date' => null]);

        $this->artisan('note:delete-expired');

        $this->assertEquals(2, Note::query()->count());
    }
}
