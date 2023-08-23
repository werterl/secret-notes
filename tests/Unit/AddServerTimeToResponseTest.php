<?php

namespace Tests\Unit;

use App\Http\Middleware\AddServerTimeToResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use PHPUnit\Framework\TestCase;

class AddServerTimeToResponseTest extends TestCase
{
    public function testMiddlewareAddServerTimeToJsonResponse(): void
    {
        $middleware = new AddServerTimeToResponse();

        $request = Request::create('/test');
        $request->headers->set('Accept', 'application/json');
        $response = new Response(json_encode(['foo' => 'bar']), 200, ['Content-Type' => 'application/json']);

        $result = $middleware->handle($request, function ($request) use ($response) {
            return $response;
        });

        $jsonResponse = json_decode($result->getContent(), true);

        $this->assertArrayHasKey('server_date', $jsonResponse);
    }
}
