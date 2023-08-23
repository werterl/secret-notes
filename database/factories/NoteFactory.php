<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * A factory for creating fake instances of the Note model.
 *
 * @package Database\Factories
 */
class NoteFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'delete_token' => fake()->regexify('[A-Za-z0-9]{20}'),
            'expiration_date' => now(),
            'email_report_sent' => false,
            'email' => fake()->safeEmail(),
            'data' => fake()->sentence(),
        ];
    }
}
