import { useState } from "react"

function Checkout() {
    // Dummy cart data
    const cartItems = [
        { id: 1, name: "Modern Sofa", price: 250, qty: 1 },
        { id: 2, name: "Wooden Chair", price: 80, qty: 2 },
    ]

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        address: "",
        phone: "",
        payment: "credit",
    })

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        alert("Order placed successfully! 🚀")
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-8">
            {/* Left: Shipping Info */}
            <form
                onSubmit={handleSubmit}
                className="md:col-span-2 border rounded-lg p-6 space-y-4 shadow"
            >
                <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
                <div>
                    <label className="block text-sm font-medium">Full Name</label>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-amber-500 focus:border-amber-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-amber-500 focus:border-amber-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Address</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-amber-500 focus:border-amber-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Mobile Phone</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-amber-500 focus:border-amber-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Payment Method</label>
                    <select
                        name="payment"
                        value={formData.payment}
                        onChange={handleChange}
                        className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-amber-500 focus:border-amber-500"
                    >
                        <option value="credit">Credit Card</option>
                        <option value="paypal">PayPal</option>
                        <option value="cod">Cash on Delivery</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="w-full bg-amber-600 text-white py-3 rounded-lg shadow hover:bg-amber-700 transition"
                >
                    Place Order
                </button>
            </form>

            {/* Right: Order Summary */}
            <div className="border rounded-lg p-6 shadow">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <ul className="divide-y divide-gray-200">
                    {cartItems.map((item) => (
                        <li key={item.id} className="flex justify-between py-2">
                            <span>
                                {item.name} (x{item.qty})
                            </span>
                            <span>${item.price * item.qty}</span>
                        </li>
                    ))}
                </ul>
                <div className="flex justify-between font-semibold mt-4">
                    <span>Subtotal</span>
                    <span>${subtotal}</span>
                </div>
                <div className="flex justify-between mt-2 text-sm text-gray-500">
                    <span>Shipping</span>
                    <span>Free</span>
                </div>
                <div className="flex justify-between font-bold text-lg mt-4">
                    <span>Total</span>
                    <span>${subtotal}</span>
                </div>
            </div>
        </div>
    )
}

export default Checkout
