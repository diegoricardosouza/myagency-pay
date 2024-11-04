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
            'status' => $this->status,
            'type_payment' => $this->type_payment,
            'price' => $this->price,
            'date' => $this->created_at,
            'user' => new UserResource($this->user),
        ];
    }
}
