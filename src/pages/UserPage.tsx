import { useState, useEffect } from "react";
import { getProfile, updateProfile } from "../services/auth";
import { getOrders } from "../services/orders";
import type { Order } from "../components/types";
import { useLocation } from "react-router-dom";

function UserPage() {
    const location = useLocation();
    const [activeTab, setActiveTab] = useState<"account" | "orders">("account");
    const [userInfo, setUserInfo] = useState({
        fullName: "",
        email: "",
        phone: "",
        address: "",
    });
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [ordersLoading, setOrdersLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    useEffect(() => {
        if (location.state?.defaultTab === "orders") {
            setActiveTab("orders");
            // Optional: Force fetch fresh orders
            setOrders([]); // Clear cache to trigger fetch
        }
    }, [location.state]);

    // Fetch profile on mount
    useEffect(() => {
        const fetchProfile = async () => {
            const response = await getProfile();
            const profile = response.data;

            setUserInfo({
                fullName: profile.name || "",
                email: profile.email || "",
                phone: profile.phone || "",
                address: profile.address || "",
            });
            setLoading(false);
        };

        fetchProfile();
    }, []);

    // Fetch orders only when tab is switched to "orders" AND orders are empty
    useEffect(() => {
        if (activeTab === "orders" && orders.length === 0) {
            fetchOrders();
        }
    }, [activeTab, orders.length]);

    // Fetch orders function
    const fetchOrders = async () => {
        setOrdersLoading(true);
        const response = await getOrders();

        // Assume Laravel always returns paginated structure: { data: [...], ... }
        setOrders(response.data?.data || response.data || []);
        setOrdersLoading(false);
    };

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserInfo((prev) => ({ ...prev, [name]: value }));
    };

    // Handle profile update
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        await updateProfile({
            name: userInfo.fullName,
            phone: userInfo.phone,
            address: userInfo.address,
        });

        setIsEditing(false);
        setIsSaving(false);
    };

    // Helper: Get status color class
    const getStatusColor = (status: string) => {
        const colors: Record<string, string> = {
            pending: "bg-yellow-100 text-yellow-800",
            processing: "bg-blue-100 text-blue-800",
            shipped: "bg-purple-100 text-purple-800",
            delivered: "bg-green-100 text-green-800",
            cancelled: "bg-red-100 text-red-800",
        };
        return colors[status] || "bg-gray-100 text-gray-800";
    };

    // Helper: Format date
    const formatDate = (dateString: string) =>
        new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });

    // Helper: Format price to IDR
    const formatPrice = (price: number) =>
        new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        }).format(price);

    // Loading skeleton
    if (loading) {
        return (
            <div className="max-w-5xl mx-auto py-12 px-4">
                <div className="border-b border-gray-200 mb-8 flex space-x-1">
                    {["account", "orders"].map((tab) => (
                        <div key={tab} className="h-8 bg-gray-200 rounded animate-pulse w-24"></div>
                    ))}
                </div>
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="relative h-48 md:h-60 bg-gray-200 animate-pulse"></div>
                    <div className="p-8">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                            <div className="w-24 h-24 rounded-full bg-gray-200 animate-pulse"></div>
                            <div className="flex-1 space-y-3">
                                <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                            </div>
                        </div>
                        <div className="border-t border-gray-100 pt-8 space-y-4">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                                    <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto py-12 px-4">
            {/* Tabs */}
            <div className="border-b border-gray-200 mb-8 flex space-x-1">
                {["account", "orders"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={`relative pb-3 px-4 text-sm font-medium transition-colors duration-200 ${activeTab === tab
                                ? "text-amber-600 border-b-2 border-amber-600"
                                : "text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        {tab === "account" && "Account"}
                        {tab === "orders" && "Orders"}
                        {activeTab === tab && (
                            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-amber-600 rounded-full"></span>
                        )}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="bg-gray-50 min-h-[calc(100vh-200px)] pb-12">
                {/* Account Tab */}
                {activeTab === "account" && (
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                        <div className="relative h-48 md:h-60">
                            <img
                                src={`https://picsum.photos/id/${Math.floor(Math.random() * 100) + 1}/1200/400`}
                                alt="Profile banner"
                                className="w-full h-full object-cover"
                                loading="lazy"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = "https://picsum.photos/id/1/1200/400";
                                }}
                            />
                            <button
                                onClick={() => setIsEditing(true)}
                                className="absolute bottom-4 right-4 bg-black/80 text-white text-sm px-5 py-2 rounded-full hover:bg-black transition-all backdrop-blur-sm"
                            >
                                Edit Profile
                            </button>
                        </div>

                        <div className="p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-white text-3xl font-bold shadow-md">
                                {userInfo.fullName.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex-1">
                                <h1 className="text-2xl font-bold text-gray-900">{userInfo.fullName}</h1>
                                <p className="text-gray-600 mt-1">{userInfo.email}</p>
                            </div>
                        </div>

                        <div className="border-t border-gray-100 p-8">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6">Personal Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Full Name</p>
                                    <p className="font-medium text-gray-900">{userInfo.fullName}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Email Address</p>
                                    <p className="font-medium text-gray-900">{userInfo.email}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Address</p>
                                    <p className="font-medium text-gray-900">{userInfo.address}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Phone Number</p>
                                    <p className="font-medium text-gray-900">{userInfo.phone}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Orders Tab */}
                {activeTab === "orders" && (
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-bold text-gray-900">My Orders</h2>
                            <button
                                onClick={fetchOrders}
                                className="text-amber-600 hover:text-amber-700 font-medium text-sm flex items-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                    />
                                </svg>
                                Refresh
                            </button>
                        </div>

                        {ordersLoading ? (
                            <div className="space-y-4">
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className="border rounded-xl p-6 animate-pulse">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="space-y-2">
                                                <div className="h-4 bg-gray-200 rounded w-32"></div>
                                                <div className="h-3 bg-gray-200 rounded w-24"></div>
                                            </div>
                                            <div className="h-6 bg-gray-200 rounded w-20"></div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="h-3 bg-gray-200 rounded w-full"></div>
                                            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : orders.length === 0 ? (
                            <div className="text-center py-16">
                                <svg
                                    className="w-16 h-16 text-gray-200 mx-auto mb-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                    />
                                </svg>
                                <p className="text-gray-500 text-lg font-medium">No orders yet</p>
                                <p className="text-gray-400 text-sm mt-1">Your purchase history will appear here.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {orders.map((order) => (
                                    <div
                                        key={order.id}
                                        className="border rounded-xl p-6 hover:shadow-md transition-shadow"
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <p className="font-semibold text-gray-900">Order #{order.id}</p>
                                                <p className="text-sm text-gray-500">{formatDate(order.created_at)}</p>
                                            </div>
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                                    order.status
                                                )}`}
                                            >
                                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                            </span>
                                        </div>

                                        <div className="mb-4">
                                            <p className="text-sm text-gray-600 mb-2">
                                                {order.order_items?.length || 0} item(s)
                                            </p>
                                            {order.order_items &&
                                                order.order_items.slice(0, 2).map((item) => (
                                                    <div key={item.id} className="flex items-center gap-3 mb-2">
                                                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                                                            {item.product?.image ? (
                                                                <img
                                                                    src={item.product.image}
                                                                    alt={item.product.name}
                                                                    className="w-full h-full object-cover rounded-lg"
                                                                />
                                                            ) : (
                                                                <svg
                                                                    className="w-6 h-6 text-gray-400"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    viewBox="0 0 24 24"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth="2"
                                                                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                                                                    />
                                                                </svg>
                                                            )}
                                                        </div>
                                                        <div className="flex-1">
                                                            <p className="text-sm font-medium text-gray-900">
                                                                {item.product?.name || `Product #${item.product_id}`}
                                                            </p>
                                                            <p className="text-xs text-gray-500">
                                                                Qty: {item.quantity} × {formatPrice(item.price)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            {order.order_items && order.order_items.length > 2 && (
                                                <p className="text-xs text-gray-500 ml-15">
                                                    +{order.order_items.length - 2} more items
                                                </p>
                                            )}
                                        </div>

                                        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                                            <button
                                                onClick={() => setSelectedOrder(order)}
                                                className="text-amber-600 hover:text-amber-700 font-medium text-sm"
                                            >
                                                View Details
                                            </button>
                                            <p className="font-semibold text-gray-900">
                                                Total: {formatPrice(order.total_amount)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Order Details Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">
                                        Order #{selectedOrder.id}
                                    </h3>
                                    <p className="text-gray-500">{formatDate(selectedOrder.created_at)}</p>
                                </div>
                                <button
                                    onClick={() => setSelectedOrder(null)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <span
                                className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                    selectedOrder.status
                                )}`}
                            >
                                {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                            </span>
                        </div>

                        <div className="p-6">
                            <h4 className="font-semibold text-gray-900 mb-4">Order Items</h4>
                            <div className="space-y-4">
                                {selectedOrder.order_items?.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
                                    >
                                        <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                                            {item.product?.image ? (
                                                <img
                                                    src={item.product.image}
                                                    alt={item.product.name}
                                                    className="w-full h-full object-cover rounded-lg"
                                                />
                                            ) : (
                                                <svg
                                                    className="w-8 h-8 text-gray-400"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                                                    />
                                                </svg>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-900">
                                                {item.product?.name || `Product #${item.product_id}`}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                {formatPrice(item.price)} × {item.quantity}
                                            </p>
                                        </div>
                                        <p className="font-semibold text-gray-900">
                                            {formatPrice(item.price * item.quantity)}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <div className="flex justify-between items-center text-lg font-bold">
                                    <span>Total Amount:</span>
                                    <span className="text-amber-600">
                                        {formatPrice(selectedOrder.total_amount)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Profile Modal */}
            {isEditing && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="edit-profile-modal"
                    onKeyDown={(e) => e.key === "Escape" && setIsEditing(false)}
                    tabIndex={-1}
                >
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-fadeIn">
                        <div className="p-6">
                            <h2
                                id="edit-profile-modal"
                                className="text-2xl font-bold text-gray-900 mb-6"
                            >
                                Edit Your Profile
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label
                                        htmlFor="fullName"
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        id="fullName"
                                        name="fullName"
                                        value={userInfo.fullName}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                                        autoFocus
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={userInfo.email}
                                        readOnly
                                        className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 text-gray-500 cursor-not-allowed"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="address"
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        value={userInfo.address}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="phone"
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={userInfo.phone}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                                    />
                                </div>

                                <div className="flex justify-end space-x-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsEditing(false)}
                                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                                        disabled={isSaving}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSaving}
                                        className="px-6 py-3 bg-amber-600 text-white rounded-xl font-medium hover:bg-amber-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSaving ? (
                                            <>
                                                <svg
                                                    className="animate-spin w-4 h-4 text-white"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                    ></circle>
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                    ></path>
                                                </svg>
                                                Saving...
                                            </>
                                        ) : (
                                            "Save Changes"
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserPage;