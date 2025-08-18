<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'first_name' => "zakaria",
            'last_name' => "el houmidi",
            'email' => "zakaria@zakaria",
            'password' => Hash::make('password'),
        ]);
    }
}
