<?php

namespace App\Http\Resources\Api;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PlanResource extends JsonResource
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
            'name' => $this->name,
            'updates' => $this->updates === -1 ? 'ilimitado' : $this->updates,
            'digital_midia' => $this->digital_midia === -1 ? 'ilimitado' : $this->digital_midia,
            'printed' => $this->printed === -1 ? 'ilimitado' : $this->printed,
            'presentations' => $this->presentations === -1 ? 'ilimitado' : $this->presentations
        ];
    }
}
