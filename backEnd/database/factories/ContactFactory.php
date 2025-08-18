<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Contact>
 */
class ContactFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "user_id" => User::factory(),
            "first_name" => fake()->firstName(),
            "last_name" => fake()->lastName(),
            "phone" => fake()->phoneNumber(),
            "email" => fake()->safeEmail(),
            "address" => fake()->address(),
            "is_favorite" => fake()->boolean(),
        ];
    }
}
