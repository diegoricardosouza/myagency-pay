<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\StoreUpdateOrderRequest;
use App\Http\Resources\Api\OrderResource;
use App\Services\OrderService;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    protected $userLogged;

    public function __construct(
        protected OrderService $repository,
    ) {
        $this->middleware(function ($request, $next) {
            $this->userLogged = Auth::user();

            return $next($request);
        });
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return OrderResource::collection($this->repository->getAll(50, $this->userLogged));
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
    public function store(StoreUpdateOrderRequest $request)
    {
        $data = $request->validated();
        // dd($data);
        $order = $this->repository->new($data);

        return new OrderResource($order);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $order = $this->repository->findOne($id);

        if (!$order) {
            return response()->json([
                'error' => 'Not Found'
            ], Response::HTTP_NOT_FOUND);
        }

        return new OrderResource($order);
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
    public function update(StoreUpdateOrderRequest $request, string $id)
    {
        $order = $this->repository->update($request->all(), $id);

        if (!$order) {
            return response()->json([
                'error' => 'Not Found'
            ], Response::HTTP_NOT_FOUND);
        }

        return new OrderResource($order);
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
