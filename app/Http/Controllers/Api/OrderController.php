<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\OrderResource;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'items'              => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity'   => 'required|integer|min:1',
        ]);

        try {
            DB::beginTransaction();

            $totalAmount = 0;
            $orderItems = [];

            foreach ($validated['items'] as $item) {
                $product = Product::find($item['product_id']);

                if ($product->stock_qty < $item['quantity']) {
                    DB::rollBack(); // rollback if insufficient stock
                    return response()->json([
                        'message' => "Insufficient stock for {$product->name}"
                    ], 400);
                }

                $subtotal = $product->price * $item['quantity'];
                $totalAmount += $subtotal;

                $orderItems[] = [
                    'product_id' => $product->id,
                    'quantity'   => $item['quantity'],
                    'price'      => $product->price,
                ];

                // Update stock
                $product->decrement('stock_qty', $item['quantity']);
            }

            $order = Order::create([
                'customer_id'  => $request->user()->id,
                'total_amount' => $totalAmount,
                'status'       => 'pending',
            ]);

            $order->orderItems()->createMany($orderItems);

            DB::commit();

            $order->load(['orderItems.product']);

            return new OrderResource($order);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Order creation failed'], 500);
        }
    }

    public function index(Request $request)
    {
        $orders = $request->user()->orders()
            ->with(['orderItems.product'])
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return OrderResource::collection($orders);
    }

    public function show(Request $request, $id)
    {
        $order = $request->user()->orders()
            ->with(['orderItems.product'])
            ->find($id);

        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        return new OrderResource($order);
    }
}
