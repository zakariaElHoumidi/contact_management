<?php

namespace Database\Factories;

use App\Models\Config;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Config>
 */
class ConfigFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $theme_modes = [Config::THEMEMODE_LIGHT, Config::THEMEMODE_DARK];
        $languages = [Config::LANGUAGE_AR, Config::LANGUAGE_EN];
        
        return [
            "user_id" => User::factory(),
            'theme_mode' => fake()->randomElement($theme_modes),
            'languages' => fake()->randomElement($languages),
        ];
    }
}
