<?php

namespace App\Http\Resources\Api;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'company' => $this->company,
            'responsible' => $this->responsible,
            'email' => $this->email,
            'level' => $this->level,
            'whatsapp' => $this->whatsapp,
            'day' => $this->day,
            'cpf' => $this->cpf,
            'logo' => url("storage/{$this->logo}")
        ];
    }
}
