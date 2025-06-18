<?php

namespace App\Traits;

trait ApiResponse
{
    /**
     * Build a success response.
     *
     * @param  mixed  $data
     * @param  string|null  $message
     * @param  int  $statusCode
     * @return \Illuminate\Http\JsonResponse
     */
    protected function successResponse($data, $message = null, $statusCode = 200)
    {
        return response()->json([
            'status' => 'success',
            'message' => $message,
            'data' => $data,
        ], $statusCode);
    }

    /**
     * Build an error response.
     *
     * @param  string|null  $message
     * @param  int  $statusCode
     * @param  mixed|null  $data
     * @return \Illuminate\Http\JsonResponse
     */
    protected function errorResponse($message = null, $statusCode, $data = null)
    {
        return response()->json([
            'status' => 'error',
            'message' => $message,
            'data' => $data,
        ], $statusCode);
    }
} 