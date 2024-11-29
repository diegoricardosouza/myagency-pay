<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class CreditCardPaymentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        // return [
        //     'amount' => 'required|numeric|min:0.01',
        //     'card_holder_name' => 'required|string|max:255',
        //     'card_number' => 'required|string',
        //     'card_cvv' => 'required|string|min:3|max:4',
        //     'card_expiration' => 'required|string|size:4',
        //     'customer_name' => 'required|string|max:255',
        //     'customer_email' => 'required|email'
        // ];

        return [
            // Validando os itens da compra
            'items' => 'required|array|min:1',
            'items.*.code' => 'required|string',
            'items.*.amount' => 'required|integer|min:1', // valor em centavos
            'items.*.description' => 'required|string',
            'items.*.quantity' => 'required|integer|min:1',

            // Validando o cliente
            'customer' => 'array',
            'customer.name' => 'string|max:255',
            'customer.email' => 'email',
            'customer.document' => 'string|min:11|max:14', // CPF ou CNPJ
            'customer.type' => 'string|in:individual,company',
            'customer.phones' => 'array',
            'customer.phones.mobile_phone' => 'array',
            'customer.phones.mobile_phone.country_code' => 'string|string',
            'customer.phones.mobile_phone.area_code' => 'string|string',
            'customer.phones.mobile_phone.number' => 'string|string',

            // Validando os dados do pagamento
            'payments' => 'array|min:1',
            'payments.*.payment_method' => 'in:credit_card,pix',
            'payments.*.credit_card' => 'required_if:payments.*.payment_method,credit_card|array',
            'payments.*.credit_card.installments' => 'required_if:payments.*.payment_method,credit_card|integer|min:1',
            'payments.*.credit_card.card.number' => 'required_if:payments.*.payment_method,credit_card|string|min:13|max:19',
            'payments.*.credit_card.card.holder_name' => 'required_if:payments.*.payment_method,credit_card|string|max:255',
            'payments.*.credit_card.card.exp_month' => 'required_if:payments.*.payment_method,credit_card|min:1', // MMYY
            'payments.*.credit_card.card.exp_year' => 'required_if:payments.*.payment_method,credit_card|int|min:2', // MMYY
            'payments.*.credit_card.card.cvv' => 'required_if:payments.*.payment_method,credit_card|string|min:3|max:4',
        ];
    }
}
