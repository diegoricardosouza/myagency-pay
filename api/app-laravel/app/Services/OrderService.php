<?php

namespace App\Services;

use App\Models\Order;

class OrderService
{
    public function __construct(
        protected Order $repository,
    ) {
    }

    public function getAll($perPage = 50, $userLogged = null)
    {
        if (!empty($userLogged) && $userLogged->level == 'CLIENTE') {
            return $this->repository
                        ->where('user_id', $userLogged->id)
                        ->orderBy('created_at', 'desc')
                        ->paginate($perPage);
        }

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

    public function getByTransactionId($id)
    {
        $order = $this->repository->with('user')->where('transaction_id', $id)->first();

        return $order;
    }

    public function updateByTransactionId($id, $data)
    {
        $order = $this->repository->where('transaction_id', $id)->first();
        $order->update($data);

        return $order;
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
