<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Services\WebhookService;
use Illuminate\Http\Request;

class WebhookController extends Controller
{
    protected $webHookService;

    public function __construct(WebhookService $webHookService)
    {
        $this->webHookService = $webHookService;
    }

    public function handlePagarMeWebhook(Request $request) {
        // $request->all();
        $this->webHookService->pagarMeWebhook($request);
    }
}
