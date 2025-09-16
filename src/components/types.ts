export interface Product {
    id: number
    name: string
    slug: string
    price: string
    image: string | null
    category: { id: number; name: string }
}

export interface CreateOrderItem {
  product_id: number;
  quantity: number;
}

export interface CreateOrderData {
  items: CreateOrderItem[];
}

export interface OrderResponse {
  data: any;
  message?: string;
}

export interface PaginatedOrderResponse {
  data: {
    data: any[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export interface OrderItem {
    id: number
    product_id: number
    quantity: number
    price: number
    product: {
        id: number
        name: string
        image?: string
    }
}

export interface Order {
  id: number;
  total_amount: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  created_at: string;
  order_items: OrderItem[];
}