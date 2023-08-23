<?php

namespace App\Console\Commands;

use App\Models\Note;
use Illuminate\Console\Command;
use Illuminate\Support\Carbon;

class DeleteExpiredNotes extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'note:delete-expired';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Delete Expired Notes';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        Note::query()
            ->whereNotNull('expiration_date')
            ->where('expiration_date', '<', Carbon::now())
            ->delete();
    }
}
