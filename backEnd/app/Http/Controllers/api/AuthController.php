<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    /**
     * @param  Request  $request
     *
     * @request-param: string email required
     * @request-param: string password required
     *
     * @return Response 200 with user, token if OK
     * @return Response 404 with an error message if KO
     */
    public function login(Request $req)
    {
        $data = $req->all();

        $rules = [
            'email'    => ['required', 'email', 'exists:users,email'],
            'password' => ['required', 'min:8'],
        ];

        $data = Validator::make($data, $rules);

        if ($data->fails()) {
            return response($data->messages(), 422);
        } else {
            $user = User::where("email", $req->email)->first();

            if (!Hash::check($req->password, $user->password)) {
                return response([
                    'password' => 'Wrong password'
                ], 404);
            }

            $token = $user
                ->createToken($user->name)
                ->plainTextToken;

            return response([
                'token' => $token,
                'user'  => $user,
            ], 200);
        }
    }

    /**
     * @param  Request  $request
     *
     * @request-param: string first_name required
     * @request-param: string last_name required
     * @request-param: string email required
     * @request-param: string password required
     *
     * @return Response  201 with user if OK
     * @return Response  422 with an error message if KO
     */
    public function register(Request $req)
    {
        $data = $req->all();

        $rules = [
            'first_name' => ['required', 'max:255'],
            'last_name'  => ['required', 'max:255'],
            'email'     => ['required', 'email', 'unique:users'],
            'password'  => ['required', 'min:8'],
        ];

        $data = Validator::make($data, $rules);

        if ($data->fails()) {
            return response($data->messages(), 422);
        } else {
            $user            = new User();
            $user->first_name = $req->first_name;
            $user->last_name  = $req->last_name;
            $user->email     = $req->email;
            $user->password  = Hash::make($req->password);
            $user->save();

            return response([
                'user'  => $user,
            ], 201);
        }
    }

    public function isAuth()
    {
        $isAuth = auth('sanctum')->check();

        return response($isAuth, 200);
    }

    public function logout(Request $req)
    {
        $isAuth = auth('sanctum')->check();
        $user = $req->user();

        if ($isAuth) {
            $user->tokens()->delete();

            return response("see you later $user->name");
        }
    }
}
