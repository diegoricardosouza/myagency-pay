<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\CreditCardPaymentRequest;
use App\Http\Requests\Api\PixPaymentRequest;
use App\Services\PagarMeService;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    protected $pagarmeService;

    public function __construct(PagarMeService $pagarmeService)
    {
        $this->pagarmeService = $pagarmeService;
    }

    public function creditCardPayment(CreditCardPaymentRequest $request)
    {
        // dd($request->installments);
        // Aqui os dados já estão validados
        $validated = $request->all();

        $response = $this->pagarmeService->processCreditCardPayment($validated);

        return response()->json($response);
    }

    public function pixPayment(CreditCardPaymentRequest $request)
    {
        // $data = $request->validate([
        //     'items' => 'required|array',
        //     'customer' => 'required|array',
        // ]);
        // Aqui os dados já estão validados
        $validated = $request->all();

        $response = $this->pagarmeService->processPixPayment($validated);

        return response()->json($response);
    }

    // public function processPix(PixPaymentRequest $request)
    // {
    //     try {
    //         $transaction = $this->pagarMeService->createPixTransaction(
    //             $request->validated()
    //         );

    //         return response()->json([
    //             'success' => true,
    //             'transaction_id' => $transaction->id,
    //             'qr_code' => $transaction->qr_code,
    //             'qr_code_url' => $transaction->qr_code_url
    //         ], 200);
    //     } catch (\Exception $e) {
    //         return response()->json([
    //             'success' => false,
    //             'message' => $e->getMessage()
    //         ], 400);
    //     }
    // }
}
