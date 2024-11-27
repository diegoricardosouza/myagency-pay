<?php

namespace App\Http\Resources\Api;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'product' => $this->product,
            'transaction_id' => $this->transaction_id,
            'status' => $this->status,
            'payment_method' => $this->payment_method,
            'price' => $this->price,
            'date' => $this->created_at,
            'qrcode' => $this->qrcode,
            'qrcode_url' => $this->qrcode_url,
            'expires_at_qrcode' => $this->expires_at_qrcode,
            'brand' => $this->brand,
            'last_four_digits' => $this->last_four_digits,
            'user' => new UserResource($this->user),
        ];
    }
}
