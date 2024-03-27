<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\StoreUpdatePlanRequest;
use App\Http\Resources\Api\PlanResource;
use App\Services\PlanService;
use Illuminate\Http\Response;

class PlanController extends Controller
{
    public function __construct(
        protected PlanService $repository,
    ) {
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return PlanResource::collection($this->repository->getAll());
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUpdatePlanRequest $request)
    {
        $data = $request->validated();
        $plans = $this->repository->new($data);

        return new PlanResource($plans);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $plan = $this->repository->findOne($id);

        if (!$plan) {
            return response()->json([
                'error' => 'Not Found'
            ], Response::HTTP_NOT_FOUND);
        }

        return new PlanResource($plan);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreUpdatePlanRequest $request, string $id)
    {
        $plan = $this->repository->update($request->all(), $id);

        // $plan = $this->repository->findOrFail($id);
        // // return $plan->update($data);

        if (!$plan) {
            return response()->json([
                'error' => 'Not Found'
            ], Response::HTTP_NOT_FOUND);
        }

        return new PlanResource($plan);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        if (!$this->repository->findOne($id)) {
            return response()->json([
                'error' => 'Not Found'
            ], Response::HTTP_NOT_FOUND);
        }

        $this->repository->delete($id);

        return response()->json([], Response::HTTP_NO_CONTENT);
    }
}
