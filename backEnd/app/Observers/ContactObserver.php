<?php

namespace App\Observers;

use App\Models\Contact;
use Illuminate\Http\Request;

class ContactObserver
{
    public function saving(Contact $contact): void
    {
        $user = request()->user();

        $contact->user_id = $user->id;
    }
}
