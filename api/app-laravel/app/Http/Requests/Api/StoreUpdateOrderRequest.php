<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreUpdateOrderRequest extends FormRequest
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
        $rules = [
            'user_id' => 'required',
            'status' => 'required',
            'transaction_id' => 'required',
            'product' => 'required',
            'payment_method' => 'required',
            'price' => 'required',
        ];

        if ($this->method() === 'PATCH' || $this->method() === 'PUT') {
            $rules = [
                'user_id' => 'nullable',
                'status' => 'nullable',
                'transaction_id' => 'nullable',
                'product' => 'nullable',
                'payment_method' => 'nullable',
                'price' => 'nullable',
            ];
        }

        return $rules;
    }
}
