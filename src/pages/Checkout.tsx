import { useState, useEffect } from "react"
import { useLocation, useNavigate, Link } from "react-router-dom"

interface OrderData {
    product: {
        id: string
        name: string
        price: number
        description: string
        category: string
        stock: number
        rating: number
        images: string[]
    }
    quantity: number
    totalPrice: number
}

function Checkout() {
    const location = useLocation()
    const navigate = useNavigate()
    const orderData: OrderData | null = location.state

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        postalCode: "",
        province: "",
        paymentMethod: "bank_transfer"
    })

    const [isProcessing, setIsProcessing] = useState(false)
    const [errors, setErrors] = useState<Record<string, string>>({})

    // Redirect if no order data
    useEffect(() => {
        if (!orderData) {
            navigate('/')
        }
    }, [orderData, navigate])

    if (!orderData) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">No Order Data Found</h2>
                    <Link to="/" className="text-amber-600 hover:text-amber-700">
                        Return to Home
                    </Link>
                </div>
            </div>
        )
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }))
        }
    }

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        if (!formData.fullName.trim()) newErrors.fullName = "Full name is required"
        if (!formData.email.trim()) newErrors.email = "Email is required"
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid"
        if (!formData.phone.trim()) newErrors.phone = "Phone number is required"
        if (!formData.address.trim()) newErrors.address = "Address is required"
        if (!formData.city.trim()) newErrors.city = "City is required"
        if (!formData.postalCode.trim()) newErrors.postalCode = "Postal code is required"
        if (!formData.province.trim()) newErrors.province = "Province is required"

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) return

        setIsProcessing(true)

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000))

            // Navigate to success page with order details
            navigate('/order-success', {
                state: {
                    orderNumber: `ORD-${Date.now()}`,
                    orderData,
                    customerData: formData
                }
            })
        } catch (error) {
            console.error('Order processing failed:', error)
        } finally {
            setIsProcessing(false)
        }
    }

    const shippingCost = 15000
    const taxRate = 0.1
    const subtotal = orderData.totalPrice
    const tax = subtotal * taxRate
    const finalTotal = subtotal + shippingCost + tax

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-6xl mx-auto px-4">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
                    <p className="text-gray-600">Complete your order</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left: Forms */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Shipping Information */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6">Shipping Information</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="fullName"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${errors.fullName ? 'border-red-300' : 'border-gray-300'}`}
                                            placeholder="Enter your full name"
                                        />
                                        {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                            Phone Number *
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${errors.phone ? 'border-red-300' : 'border-gray-300'}`}
                                            placeholder="08123456789"
                                        />
                                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${errors.email ? 'border-red-300' : 'border-gray-300'}`}
                                        placeholder="your@email.com"
                                    />
                                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                </div>

                                <div>
                                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                                        Full Address *
                                    </label>
                                    <textarea
                                        id="address"
                                        name="address"
                                        rows={3}
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${errors.address ? 'border-red-300' : 'border-gray-300'}`}
                                        placeholder="Street address, apartment, suite, unit, building, floor, etc."
                                    />
                                    {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                                            City *
                                        </label>
                                        <input
                                            type="text"
                                            id="city"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${errors.city ? 'border-red-300' : 'border-gray-300'}`}
                                            placeholder="City"
                                        />
                                        {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="province" className="block text-sm font-medium text-gray-700 mb-2">
                                            Province *
                                        </label>
                                        <input
                                            type="text"
                                            id="province"
                                            name="province"
                                            value={formData.province}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${errors.province ? 'border-red-300' : 'border-gray-300'}`}
                                            placeholder="Province"
                                        />
                                        {errors.province && <p className="text-red-500 text-sm mt-1">{errors.province}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-2">
                                            Postal Code *
                                        </label>
                                        <input
                                            type="text"
                                            id="postalCode"
                                            name="postalCode"
                                            value={formData.postalCode}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${errors.postalCode ? 'border-red-300' : 'border-gray-300'}`}
                                            placeholder="12345"
                                        />
                                        {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>}
                                    </div>
                                </div>
                            </form>
                        </div>

                        {/* Payment Method */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Method</h2>
                            <div className="space-y-3">
                                {[
                                    { id: 'bank_transfer', name: 'Bank Transfer', desc: 'Transfer to our bank account' },
                                    { id: 'e_wallet', name: 'E-Wallet', desc: 'GoPay, OVO, DANA, LinkAja' },
                                    { id: 'credit_card', name: 'Credit Card', desc: 'Visa, Mastercard, JCB' },
                                    { id: 'cod', name: 'Cash on Delivery', desc: 'Pay when item arrives' }
                                ].map((method) => (
                                    <label key={method.id} className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg hover:border-amber-300 cursor-pointer transition-colors">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value={method.id}
                                            checked={formData.paymentMethod === method.id}
                                            onChange={handleInputChange}
                                            className="mt-1 text-amber-600 focus:ring-amber-500"
                                        />
                                        <div className="flex-1">
                                            <div className="font-medium text-gray-900">{method.name}</div>
                                            <div className="text-sm text-gray-500">{method.desc}</div>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>

                            {/* Product Item */}
                            <div className="flex space-x-4 mb-6 pb-6 border-b border-gray-200">
                                <img
                                    src={orderData.product.images[0]}
                                    alt={orderData.product.name}
                                    className="w-16 h-16 object-cover rounded-lg"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement
                                        target.src = "https://via.placeholder.com/64x64?text=Product"
                                    }}
                                />
                                <div className="flex-1">
                                    <h3 className="font-medium text-gray-900 text-sm line-clamp-2">
                                        {orderData.product.name}
                                    </h3>
                                    <p className="text-sm text-gray-500">Qty: {orderData.quantity}</p>
                                    <p className="text-amber-600 font-semibold text-sm">
                                        Rp {orderData.product.price.toLocaleString("id-ID")}
                                    </p>
                                </div>
                            </div>

                            {/* Price Breakdown */}
                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="font-medium">Rp {subtotal.toLocaleString("id-ID")}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Shipping</span>
                                    <span className="font-medium">Rp {shippingCost.toLocaleString("id-ID")}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Tax (10%)</span>
                                    <span className="font-medium">Rp {tax.toLocaleString("id-ID")}</span>
                                </div>
                                <div className="border-t border-gray-200 pt-3">
                                    <div className="flex justify-between">
                                        <span className="text-lg font-semibold text-gray-900">Total</span>
                                        <span className="text-lg font-bold text-amber-600">
                                            Rp {finalTotal.toLocaleString("id-ID")}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Place Order Button */}
                            <button
                                onClick={handleSubmit}
                                disabled={isProcessing}
                                className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-200 ${isProcessing
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-amber-600 hover:bg-amber-700 transform hover:scale-105 shadow-md hover:shadow-lg"
                                    } focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2`}
                            >
                                {isProcessing ? (
                                    <div className="flex items-center justify-center space-x-2">
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>Processing...</span>
                                    </div>
                                ) : (
                                    `Place Order - Rp ${finalTotal.toLocaleString("id-ID")}`
                                )}
                            </button>

                            {/* Security Badge */}
                            <div className="flex items-center justify-center mt-4 text-xs text-gray-500">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                Secure SSL encrypted checkout
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout