<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class ContactController extends Controller
{
    public function index(Request $req)
    {
        $user = $req->user();
        $contacts = $user->contacts;

        if ($contacts->isEmpty()) {
            return response("you don't have contacts yet .", 200);
        } else {
            return response($contacts, 200);
        }
    }

    /**
     * @param  Request  $request
     *
     * @request-param: string first_name required
     * @request-param: string last_name required
     * @request-param: string phone required
     * @request-param: string email required
     * @request-param: string address required
     * @request-param: string is_favorite required
     *
     * @return Response  201 with contact if OK
     * @return Response  422 with an error message if KO
     */

    public function store(Request $req)
    {
        $data = $req->all();

        $rules = [
            'first_name' => ['required', 'max:255'],
            'last_name'  => ['required', 'max:255'],
            'phone'     => ['required', 'unique:contacts', 'digits:10', 'starts_with:0'],
            'email'     => ['required', 'email', 'unique:contacts'],
            'address' => 'required|string',
            'is_favorite' => 'required|boolean'
        ];

        $data = Validator::make($data, $rules);

        if ($data->fails()) {
            return response($data->messages(), 422);
        } else {
            $contact = new Contact();

            $contact->first_name = $req->first_name;
            $contact->last_name = $req->last_name;
            $contact->phone = $req->phone;
            $contact->email = $req->email;
            $contact->address = $req->address;
            $contact->is_favorite = $req->is_favorite;
            $contact->save();

            return response([
                'contact'  => $contact,
            ], 201);
        }
    }

    /**
     * @param  Request  $request
     *
     * @request-param: string first_name required
     * @request-param: string last_name required
     * @request-param: string phone required
     * @request-param: string email required
     * @request-param: string address required
     * @request-param: string is_favorite required
     *
     * @return Response  200 with contact if OK
     * @return Response  422 with an error message if KO
     */
    public function update(Request $req, Contact $contact)
    {
        $data = $req->all();
        $userAuth = $req->user();

        if (!$contact || $contact->user_id !== $userAuth->id) {
            return response("contact not found", 200);
        }

        $rules = [
            'first_name' => ['max:255'],
            'last_name'  => ['max:255'],
            'phone'     => [
                'digits:10',
                'starts_with:0',
                Rule::unique('contacts')->ignore($contact->id),
            ],
            'email'     => [
                'email',
                Rule::unique('contacts')->ignore($contact->id)
            ],
            'address' => 'string',
            'is_favorite' => 'boolean'
        ];

        $data = Validator::make($data, $rules);

        if ($data->fails()) {
            return response($data->messages(), 422);
        } else {
            if ($req->has('first_name')) {
                $contact->first_name = $req->first_name;
            }
            if ($req->has('last_name')) {
                $contact->last_name = $req->last_name;
            }
            if ($req->has('phone')) {
                $contact->phone = $req->phone;
            }
            if ($req->has('email')) {
                $contact->email = $req->email;
            }
            if ($req->has('address')) {
                $contact->address = $req->address;
            }
            if ($req->has('is_favorite')) {
                $contact->is_favorite = $req->is_favorite;
            }
            $contact->save();

            return response([
                'contact'  => $contact,
            ], 200);
        }
    }

    public function show(Request $req, Contact $contact)
    {
        $userAuth = $req->user();
        if (!$contact || $contact->user_id !== $userAuth->id) {
            return response("contact not found", 200);
        }
        return response($contact, 200);
    }

    public function destroy(Request $req, Contact $contact)
    {
        $userAuth = $req->user();
        if (!$contact || $contact->user_id !== $userAuth->id) {
            return response("contact not found", 200);
        }

        $contact->delete();
        return response($contact, 200);
    }
}
