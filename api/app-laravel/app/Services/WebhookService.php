<?php

namespace App\Services;

use App\Mail\NotifyPayMail;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class WebhookService
{
    public function __construct(
        protected OrderService $orderService,
        protected UserService $userService,
    ) {}

    public function pagarMeWebhook($request)
    {
        // Valide a assinatura do webhook (importante!)
        // if (!$this->validateWebhookSignature($request)) {
        //     return response()->json(['error' => 'Unauthorized'], 401);
        // }

        try {
            $payload = $request->all();
            $transactionId = $payload['data']['id'];
            $status = $payload['data']['status'];
            $email = $payload['data']['customer']['email'];
            // ds([$payload, $payload['data']['id'], $payload['data']['customer']['email']]);
            //ds([$payload['type'], $payload['data']]);

            $this->handleTransactionStatus($payload['type'], $transactionId, $email);

            // Verifica se é um evento de transação
            // if (isset($payload['type']) && $payload['type'] === 'transaction') {
            //     ds($transaction);
            //     // Dispara eventos ou notificações baseado no status
            //     $this->handleTransactionStatus($transaction);

            //     return response()->json(['status' => 'received'], 200);
            // }

            return response()->json(['status' => 'ignored'], 200);
        } catch (\Exception $e) {
            Log::error('Webhook Error: ' . $e->getMessage());
            return response()->json(['error' => 'Processing error'], 500);
        }
    }

    // protected function validateWebhookSignature(Request $request)
    // {
    //     // Implemente a validação da assinatura do Pagar.me
    //     $pagarMeSignature = $request->header('X-Hub-Signature');
    //     $payload = $request->getContent();

    //     $expectedSignature = hash_hmac(
    //         'sha1',
    //         $payload,
    //         config('services.pagarme.webhook_secret')
    //     );

    //     return hash_equals($expectedSignature, $pagarMeSignature);
    // }

    protected function handleTransactionStatus($status, $transactionId, $email = null)
    {
        switch ($status) {
            case 'order.paid':
                $this->notifyPaymentConfirmed($transactionId, $email);
                break;

            case 'order.updated':
                $this->notifyPendingPayment($transactionId);
                break;

            case 'refused':
                $this->notifyPaymentRefused($transactionId);
                break;
            case 'order.payment_failed':
                $this->notifyPaymentFailed($transactionId);
                break;
        }
    }

    protected function notifyPaymentConfirmed($transactionId, $email = null)
    {
        $this->orderService->updateByTransactionId($transactionId, [
            'status' => 'paid',
        ]);

        // recupera usuario pelo email
        $user = $this->userService->findByEmail($email);

        // recupera a order pelo transaction id
        $order = $this->orderService->getByTransactionId($transactionId);

        $this->userService->update([
            'credits' => ($user->credits + $order->quantity)
        ], $user->id);

        // Exemplo: Enviar email de confirmação
        Mail::to('financeiro@inovasite.com')->send(new NotifyPayMail([
            'url' => env('URL_FRONT') . "/pedidos",
        ], 'Novo pedido realizado no artes!'));
        // Mail::to($order->user)->send(new PaymentConfirmedMail($order));
    }

    protected function notifyPendingPayment($transactionId)
    {
        $this->orderService->updateByTransactionId($transactionId, [
            'status' => 'pending'
        ]);

        // Exemplo: Notificar sobre pagamento pendente
        // Notify admin or send notification to user
    }

    protected function notifyPaymentRefused($transactionId)
    {
        $this->orderService->updateByTransactionId($transactionId, [
            'status' => 'refused'
        ]);

        // Exemplo: Enviar notificação de pagamento recusado
        // Mail::to($order->user)->send(new PaymentRefusedMail($order));
    }

    protected function notifyPaymentFailed($transactionId)
    {
        $this->orderService->updateByTransactionId($transactionId, [
            'status' => 'failed'
        ]);

        // Exemplo: Enviar notificação de pagamento recusado
        // Mail::to($order->user)->send(new PaymentRefusedMail($order));
    }
}
