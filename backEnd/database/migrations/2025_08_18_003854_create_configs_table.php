<?php

use App\Models\Config;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('configs', function (Blueprint $table) {
            $theme_modes = [Config::THEMEMODE_LIGHT, Config::THEMEMODE_DARK];
            $languages = [Config::LANGUAGE_AR, Config::LANGUAGE_EN];

            $table->id();
            $table->foreignId('user_id')->constrained('users');
            $table->enum("theme_mode", $theme_modes);
            $table->enum("languages", $languages);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('configs');
    }
};
