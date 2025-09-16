import api from "./axios";
import type { CreateOrderData, OrderResponse, PaginatedOrderResponse } from "../components/types";

// Get all orders for the authenticated user
export const getOrders = async (
  page: number = 1
): Promise<PaginatedOrderResponse> => {
  try {
    const response = await api.get(`/api/orders?page=${page}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    throw error;
  }
};

// Get a specific order by ID
export const getOrderById = async (orderId: number): Promise<OrderResponse> => {
  try {
    const response = await api.get(`/api/orders/${orderId}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch order ${orderId}:`, error);
    throw error;
  }
};

// Create a new order
export const createOrder = async (
  orderData: CreateOrderData
): Promise<OrderResponse> => {
  try {
    const response = await api.post("/api/orders", orderData);
    return response.data;
  } catch (error) {
    console.error("Failed to create order:", error);
    throw error;
  }
};
