<?php

namespace App\Services;

use App\Models\Plan;

class PlanService
{
    public function __construct(
        protected Plan $repository,
    ) {
    }

    public function getAll($perPage = 10)
    {
        return $this->repository->paginate($perPage);
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
        $plan = $this->repository->findOrFail($id);
        $plan->update($data);

        return $plan;
    }

    public function delete($id)
    {
        $plan = $this->repository->findOrFail($id);
        $plan->delete();
    }
}
