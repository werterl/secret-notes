<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

/**
 * Custom validation rule to validate base64 encoded data attribute of a note.
 *
 * @package App\Rules
 */

class NoteData implements ValidationRule
{
    /**
     * @param  string  $attribute
     * @param  mixed  $value
     * @param  Closure  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (!base64_decode($value, true)) {
            $fail(__('The :attribute must be a valid base64 encoded string'));
        }
    }
}
