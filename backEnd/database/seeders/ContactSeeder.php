<?php

namespace Database\Seeders;

use App\Models\Contact;
use App\Models\User;
use Illuminate\Database\Seeder;

class ContactSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Contact::create([
            "user_id" => User::first()->id,
            "first_name" => "yahya",
            "last_name" => "hamdy",
            "phone" => "+212606739009",
            "email" => "mandela@mandela",
            "address" => "derb soultane",
            "is_favorite" => 0,
        ]);
    }
}
