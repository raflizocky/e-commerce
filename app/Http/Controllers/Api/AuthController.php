<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CustomerResource;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|string|email|max:255|unique:customers',
            'password' => 'required|string|min:8',
            'phone'    => 'nullable|string|max:20',
            'address'  => 'nullable|string',
        ]);

        $customer = Customer::create([
            'name'     => $validated['name'],
            'email'    => $validated['email'],
            'password' => Hash::make($validated['password']),
            'phone'    => $validated['phone'] ?? null,
            'address'  => $validated['address'] ?? null,
        ]);

        $token = $customer->createToken('auth_token')->plainTextToken;

        return response()->json([
            'customer'   => new CustomerResource($customer),
            'token'      => $token,
            'token_type' => 'Bearer',
        ]);
    }

    public function login(Request $request)
    {
        $validated = $request->validate([
            'email'    => 'required|email',
            'password' => 'required',
        ]);

        $customer = Customer::where('email', $validated['email'])->first();

        if (!$customer || !Hash::check($validated['password'], $customer->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $token = $customer->createToken('auth_token')->plainTextToken;

        return response()->json([
            'customer'   => new CustomerResource($customer),
            'token'      => $token,
            'token_type' => 'Bearer',
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out successfully']);
    }

    public function profile(Request $request)
    {
        return new CustomerResource($request->user());
    }

    public function updateProfile(Request $request)
    {
        $validated = $request->validate([
            'name'    => 'sometimes|required|string|max:255',
            'phone'   => 'nullable|string|max:20',
            'address' => 'nullable|string',
        ]);

        $customer = $request->user();
        $customer->update($validated);

        return new CustomerResource($customer);
    }
}
