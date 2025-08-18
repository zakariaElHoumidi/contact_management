<?php

namespace App\Observers;

use App\Models\User;

class UserObserver
{
    public function saving(User $user): void
    {
        $user->name = ucfirst($user->first_name) . ' ' . ucfirst($user->last_name);
    }
}
