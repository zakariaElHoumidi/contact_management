<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Config extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'theme_mode',
        'languages',
    ];

    // theme_mode
    const THEMEMODE_LIGHT = "light";
    const THEMEMODE_DARK = "dark";

    // language
    const LANGUAGE_AR = "ar";
    const LANGUAGE_EN = "en";

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
