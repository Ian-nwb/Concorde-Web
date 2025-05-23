<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Validator;
use JWTAuth;

class AuthController extends Controller
{
    public function signup(Request $request)
    {
        // Validate input
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|max:255',
            'middle_name' => 'nullable|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'mobile' => 'required|string|max:20|unique:users',
            'password' => 'required|string|min:6',
            'availability' => 'nullable|string',
            'role' => 'required|string|in:user,admin', // Validate role field (user or admin)
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        // Create the user with role
        $user = User::create([
            'first_name' => $request->first_name,
            'middle_name' => $request->middle_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'mobile' => $request->mobile,
            'password' => Hash::make($request->password), // Hash the password
            'role' => $request->role, // Store role (either 'user' or 'admin')
            'availability' => $request->availability,
            
        ]);

        // Generate JWT token
        $token = JWTAuth::fromUser($user);

        // Return response with token
        return response()->json([
            'status' => true,
            'message' => 'User registered successfully.',
            'token' => $token,
            'user' => $user,
        ], 201);
    }
    public function login(Request $request)
{
    try {
        // Validation
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        // Check credentials and generate JWT
        $credentials = $request->only('email', 'password');

        if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json([
                'status' => false,
                'message' => 'Invalid email or password',
            ], 401);
        }

        // Fetch the authenticated user
        $user = JWTAuth::user();

        return response()->json([
            'status' => true,
            'message' => 'Login successful',
            'token' => $token,
            'user' => $user,
        ], 200);

    } catch (Exception $e) {
        return response()->json([
            'status' => false,
            'error' => 'Something went wrong',
            'message' => $e->getMessage(),
        ], 500);
    }
}
public function logout(Request $request)
{
    try {
        // Invalidate the current JWT token
        JWTAuth::invalidate(JWTAuth::getToken());

        return response()->json([
            'status' => true,
            'message' => 'Logged out successfully',
        ], 200);

    } catch (Exception $e) {
        return response()->json([
            'status' => false,
            'message' => 'Failed to logout',
            'error' => $e->getMessage(),
        ], 500);
    }
}
public function getUser(Request $request)
{
    return response()->json(auth()->user());
}
// public function upload(){

// }

public function registration(Request $request)
{
    try {
        // Authenticate the user using JWT
        $user = JWTAuth::parseToken()->authenticate();
    } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
        return response()->json(['message' => 'User not authenticated.'], 401);
    }
\Log::info('Request data:', $request->all());

    // Validate the incoming request data
    $validator = Validator::make($request->all(), [
        'region' => 'required|string',
        'province' => 'required|string',
        'city' => 'required|string',
        'barangay' => 'required|string',
        'street' => 'required|string',
        'building_number' => 'required|string',
        'zip_code' => 'required|string',
        'gender' => 'required|string',
        'position' => 'nullable|string',
        'secondary_position' => 'nullable|string',
        'civil_status' => 'required|string',
        'birthday' => 'required|date_format:Y-m-d',
    ]);

    // Return validation errors if any
    if ($validator->fails()) {
        return response()->json([
            'message' => 'Validation failed',
            'errors' => $validator->errors(),
        ], 422);
    }
if ($validator->fails()) {
    \Log::error('Validation errors:', $validator->errors()->all());  // Log all error messages as an array
    return response()->json([
        'message' => 'Validation failed',
        'errors' => $validator->errors(),
    ], 422);
}
    // Log the incoming request data
    \Log::info('Request data:', $request->all());

    // Use the names directly from the frontend data (no API call required)
    $regionName = $request->input('region');
    $provinceName = $request->input('province');
    if ($provinceName === 'MM') {
        $provinceName = 'Metro Manila'; // Adjusting to a readable name for consistency
    }
    $cityName = $request->input('city');
    $barangayName = $request->input('barangay');

    \Log::info('Fetched names:', [
        'region' => $regionName,
        'province' => $provinceName,
        'city' => $cityName,
        'barangay' => $barangayName,
    ]);

    // Update the user's registration details
    $user->update([
        'region' => $regionName,
        'province' => $provinceName,
        'city' => $cityName,
        'barangay' => $barangayName,
        'street' => $request->input('street'),
        'building_number' => $request->input('building_number'),
        'zip_code' => $request->input('zip_code'),
        'gender' => $request->input('gender'),
        'position' => $request->input('position'),
        'secondary_position' => $request->input('secondary_position'),
        'civil_status' => $request->input('civil_status'),
        'birthday' => $request->input('birthday'),
    ]);

    // Return success message with the updated user data
    return response()->json([
        'message' => 'Registration details updated successfully!',
        'user' => $user,
    ], 200);
}

}