<?php

namespace App\Providers;

use App\Contracts\NotificationServiceInterface;
use App\Services\NoteService;
use App\Services\NotificationService;
use Illuminate\Contracts\Container\Container;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(NoteService::class, fn(Container $app) => new NoteService());
        $this->app->bind(NotificationServiceInterface::class, NotificationService::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
