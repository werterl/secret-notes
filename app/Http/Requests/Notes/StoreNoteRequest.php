<?php

namespace App\Http\Requests\Notes;

use App\Rules\NoteData;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;

/**
 * Class StoreNoteRequest
 * @package App\Http\Requests\Notes
 */
class StoreNoteRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'expiration' => 'in:hour,day,week,month',
            'password' => 'string|min:8|max:16',
            'self_destruct' => 'boolean',
            'email' => 'email',
            'data' => ['required', 'max:10000', new NoteData()]
        ];
    }

    /**
     * @param  Validator  $validator
     */
    public function failedValidation(Validator $validator)
    {
        $response = response()->json([
            'errors' => $validator->errors()
        ], 422);

        throw new HttpResponseException($response);
    }
}
