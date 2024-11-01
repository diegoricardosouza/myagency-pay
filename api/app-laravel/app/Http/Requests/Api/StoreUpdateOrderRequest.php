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
            'status' => [
                'required',
                Rule::in(['processing', 'canceled', 'finished'])
            ],
            'product' => 'required',
            'type_payment' => 'required',
            'price' => 'required',
        ];

        if ($this->method() === 'PATCH' || $this->method() === 'PUT') {
            $rules = [
                'user_id' => 'nullable',
                'status' => [
                    'nullable',
                    Rule::in(['processing', 'canceled', 'finished'])
                ],
                'product' => 'nullable',
                'type_payment' => 'nullable',
                'price' => 'nullable',
            ];
        }

        return $rules;
    }
}
