<?php

namespace App\Services;

use App\Models\Order;

class OrderService
{
    public function __construct(
        protected Order $repository,
    ) {
    }

    public function getAll($perPage = 50)
    {
        return $this->repository
                    ->orderBy('created_at', 'desc')
                    ->paginate($perPage);
    }

    public function new($data)
    {
        return $this->repository->create($data);
    }

    public function findOne($id)
    {
        return $this->repository->findOrFail($id);
    }

    public function update($data, $id)
    {
        $order = $this->repository->findOrFail($id);
        $order->update($data);

        return $order;
    }

    public function delete($id)
    {
        $order = $this->repository->findOrFail($id);
        $order->delete();
    }
}
