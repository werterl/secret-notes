<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

/**
 * This model represents a secret note.
 *
 * @package App\Models
 */
class Note extends Model
{
    use HasFactory;

    /**
     * @var bool
     */
    public $timestamps = false;
    /**
     * @var bool
     */
    public $incrementing = false;

    /**
     * Automatically generates a UUID for the 'id' field before creating a new note.
     */
    protected static function boot()
    {
        parent::boot();
        static::creating(function ($note) {
            $note->{$note->getKeyName()} = Str::uuid();
        });
    }

    /**
     * @var string[]
     */

    protected $casts = [
        'expiration_date' => 'datetime',
        'email_report_sent' => 'boolean',
        'id' => 'string'
    ];

    /**
     * @var string[]
     */
    protected $visible = [
        'id',
        'delete_token',
        'data',
        'expiration_date'
    ];

    /**
     * @var string[]
     */
    protected $fillable = [
        'id',
        'delete_token',
        'expiration_date',
        'email_report_sent',
        'email',
        'data'
    ];
}
