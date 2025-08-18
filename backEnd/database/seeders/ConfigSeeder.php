<?php

namespace Database\Seeders;

use App\Models\Config;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ConfigSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Config::create([
            "user_id" => User::first()->id,
            'theme_mode' => Config::THEMEMODE_DARK,
            'languages' => Config::LANGUAGE_EN,
        ]);
    }
}
