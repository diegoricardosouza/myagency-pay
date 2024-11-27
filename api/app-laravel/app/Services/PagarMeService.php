<?php

namespace App\Services;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use Illuminate\Support\Facades\Auth;
use App\Services\OrderService;

use Illuminate\Support\Facades\Log;


class PagarMeService
{
    protected $client;
    protected $apiKey;

    public function __construct(
        protected OrderService $orderRepository
    )
    {
        $this->apiKey = base64_encode(config('pagarme.api_key') . ':'); // Codificação em Base64 com `:` para o Basic Auth
        $this->client = new Client([
            // 'base_uri' => config('pagarme.base_uri'),
            'headers' => [
                'Authorization' => "Basic {$this->apiKey}", // Cabeçalho com Basic Auth
                'Content-Type' => 'application/json'
            ]
        ]);
        // dd($this->apiKey);
    }

    // Método para processar pagamento com cartão de crédito
    public function processCreditCardPayment($data)
    {
        $installments = $data['payments'][0]['credit_card']['installments'];
        $card = $data['payments'][0]['credit_card']['card'];
        $billing = $data['payments'][0]['credit_card']['card']['billing_address'];

        // dd($billing);

        try {
            $response = $this->client->post('https://api.pagar.me/core/v5/orders', [
                'json' => [
                    'items' => $data['items'],
                    'customer' => $data['customer'],
                    'payments' => [
                        [
                            'payment_method' => 'credit_card',
                            'credit_card' => [
                                'installments' => $installments,
                                'card' => [
                                    'number' => $card['number'],
                                    'holder_name' => $card['holder_name'],
                                    'exp_month' => $card['exp_month'],
                                    'exp_year' => $card['exp_year'],
                                    'cvv' => $card['cvv'],
                                    'billing_address' => [
                                        'line_1' => $billing['line_1'],
                                        'zip_code' => $billing['zip_code'],
                                        'city' => $billing['city'],
                                        'state' => $billing['state'],
                                        'country' => $billing['country'],
                                    ]
                                ]
                            ]
                        ]
                    ]
                ],
            ]);

            $response = json_decode($response->getBody()->getContents(), true);
            $status = $response['status'];

            //cadastra o pedido no bd
            if ($response) {
                $this->orderRepository->new([
                    "user_id" => Auth::user()->id,
                    "transaction_id" => $response['id'],
                    "status" => $status,
                    "product" => $response['items'][0]['description'],
                    "payment_method" => "credit_card",
                    "price" => $response['amount'] / 100,
                    "brand" => $response['charges'][0]['last_transaction']['card']['brand'],
                    "last_four_digits" => $response['charges'][0]['last_transaction']['card']['last_four_digits'],
                ]);
            }

            return [$response, $status];
        } catch (RequestException $e) {
            Log::error('Erro no pagamento de cartão: ' . $e->getMessage());
            return ['error' => $e->getMessage()];
        }
    }

    // Método para processar pagamento via PIX
    public function processPixPayment($data)
    {
        // $card = $data['payments'][0]['pix']['expires_in'];
        // dd($card);
        try {
            $response = $this->client->post('https://api.pagar.me/core/v5/orders', [
                'json' => [
                    'items' => $data['items'],
                    'customer' => $data['customer'],
                    'payments' => [
                        [
                            'payment_method' => 'pix',
                            'pix' => [
                                'expires_in' => (60 * 60) * 24 // 24horas
                            ]
                        ]
                    ]
                ],
            ]);

            $response = json_decode($response->getBody()->getContents(), true);
            $status = $response['status'];

            //cadastra o pedido no bd
            if($response) {
                $this->orderRepository->new([
                    "user_id" => Auth::user()->id,
                    "transaction_id" => $response['id'],
                    "status" => $status,
                    "product" => $response['items'][0]['description'],
                    "payment_method" => "pix",
                    "price" => $response['amount'] / 100,
                    "qrcode" => $response['charges'][0]['last_transaction']['qr_code'],
                    "qrcode_url" => $response['charges'][0]['last_transaction']['qr_code_url'],
                    "expires_at_qrcode" => $response['charges'][0]['last_transaction']['expires_at'],
                ]);
            }

            return [$response, $status];
        } catch (RequestException $e) {
            Log::error('Erro no pagamento PIX: ' . $e->getMessage());
            return ['error' => $e->getMessage()];
        }
    }

    // public function createCreditCardTransaction(array $data)
    // {
    //     try {
    //         return $this->client->transactions()->create([
    //             'amount' => $data['amount'] * 100, // centavos
    //             'payment_method' => 'credit_card',
    //             'card_holder_name' => $data['card_holder_name'],
    //             'card_number' => $data['card_number'],
    //             'card_cvv' => $data['card_cvv'],
    //             'card_expiration_date' => $data['card_expiration'],
    //             'customer' => [
    //                 'name' => $data['customer_name'],
    //                 'email' => $data['customer_email']
    //             ]
    //         ]);
    //     } catch (\Exception $e) {
    //         Log::error('Erro no pagamento de cartão: ' . $e->getMessage());
    //         throw $e;
    //     }
    // }

    // public function createPixTransaction(array $data)
    // {
    //     try {
    //         return $this->client->transactions()->create([
    //             'amount' => $data['amount'] * 100, // centavos
    //             'payment_method' => 'pix',
    //             'customer' => [
    //                 'name' => $data['customer_name'],
    //                 'email' => $data['customer_email']
    //             ]
    //         ]);
    //     } catch (\Exception $e) {
    //         Log::error('Erro no pagamento PIX: ' . $e->getMessage());
    //         throw $e;
    //     }
    // }
}
