<?php

namespace App\Http\Middleware;

use Carbon\Carbon;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AddServerTimeToResponse
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        if (in_array($response->getStatusCode(), [200, 201]) && $response->headers->get('Content-Type') === 'application/json') {
            $jsonContent = $response->getContent();
            $decodedJson = json_decode($jsonContent, true);

            if (json_last_error() === JSON_ERROR_NONE) {
                $decodedJson['server_date'] = Carbon::now();
                $response->setContent(json_encode($decodedJson));
            }
        }

        return $response;
    }

}
