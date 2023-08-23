<?php

namespace App\Http\Requests\Notes;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

/**
 * Class DestroyNoteRequest
 * @package App\Http\Requests\Notes
 */
class DestroyNoteRequest extends FormRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'delete_token' => 'required|string|size:20'
        ];
    }

    public function failedValidation(Validator $validator)
    {
        $response = response()->json([
            'errors' => $validator->errors()
        ], 422);

        throw new HttpResponseException($response);
    }
}
