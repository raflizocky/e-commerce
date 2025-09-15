import { Link, useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

function ProductDetail() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const [quantity, setQuantity] = useState(1)
    const [isLoading, setIsLoading] = useState(true)

    const product = {
        id,
        name: "Minimalist Wooden Chair",
        price: 129.99,
        description:
            "A beautifully crafted minimalist wooden chair, perfect for your modern living room or office. Made from sustainably sourced teak wood with hand-finished joints for lasting durability.",
        category: "Furniture",
        stock: 12,
        rating: 4.5,
        images: [
            `https://picsum.photos/id/${parseInt(id || "1") + 100}/800/600`,
            `https://picsum.photos/id/${parseInt(id || "1") + 200}/800/600`,
            `https://picsum.photos/id/${parseInt(id || "1") + 300}/800/600`,
        ],
    }

    const [mainImage, setMainImage] = useState(product.images[0])

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 500)
        return () => clearTimeout(timer)
    }, [])

    // Prevent negative quantity
    const handleDecrement = () => setQuantity((q) => Math.max(1, q - 1))
    const handleIncrement = () => setQuantity((q) => q + 1)

    // Handle order button click
    const handleOrder = () => {
        const orderData = {
            product,
            quantity,
            totalPrice: product.price * quantity
        }
        // Navigate to checkout with order data
        navigate('/checkout', { state: orderData })
    }

    return (
        <div className="max-w-6xl mx-auto py-12 px-4">
            {/* Main Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
                {/* Left: Image Gallery */}
                <div className="space-y-6">
                    {/* Main Image */}
                    <div className="relative overflow-hidden rounded-2xl bg-gray-50 aspect-[4/3]">
                        {isLoading ? (
                            <div className="w-full h-full bg-gray-200 animate-pulse"></div>
                        ) : (
                            <img
                                src={mainImage}
                                alt={product.name}
                                className="w-full h-full object-cover transition-opacity duration-300"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement
                                    target.src = "https://via.placeholder.com/800x600?text=Product+Image"
                                }}
                                loading="eager"
                            />
                        )}
                    </div>

                    {/* Thumbnail Gallery */}
                    <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
                        {product.images.map((img, i) => (
                            <button
                                key={i}
                                onClick={() => setMainImage(img)}
                                className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 ${mainImage === img
                                    ? "border-amber-600 shadow-md scale-105"
                                    : "border-gray-200 hover:border-gray-300"
                                    }`}
                                aria-label={`View thumbnail ${i + 1}`}
                            >
                                <img
                                    src={img}
                                    alt={`Thumbnail ${i + 1}`}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement
                                        target.src = "https://via.placeholder.com/200x200?text=Thumb"
                                    }}
                                    loading="lazy"
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right: Product Info */}
                <div className="flex flex-col justify-start">
                    {/* Title */}
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
                        {product.name}
                    </h1>

                    {/* Price & Rating */}
                    <div className="flex items-center gap-4 mb-6">
                        <span className="text-3xl md:text-4xl font-bold text-amber-600">
                            Rp {product.price.toLocaleString("id-ID")}
                        </span>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                            <svg className="w-4 h-4 fill-current text-amber-500" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.922-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            {product.rating} ({product.stock > 0 ? `${product.stock} reviews` : "No reviews"})
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 text-lg leading-relaxed mb-8">
                        {product.description}
                    </p>

                    {/* Specs */}
                    <div className="space-y-3 mb-8">
                        <div className="flex">
                            <span className="font-medium text-gray-700 min-w-24">Category:</span>
                            <span className="text-gray-600">{product.category}</span>
                        </div>
                        <div className="flex">
                            <span className="font-medium text-gray-700 min-w-24">Stock:</span>
                            <span className={`font-medium ${product.stock > 5 ? 'text-green-600' : product.stock > 0 ? 'text-amber-600' : 'text-red-600'}`}>
                                {product.stock > 5 ? `${product.stock} in stock` : product.stock > 0 ? 'Low stock!' : 'Out of stock'}
                            </span>
                        </div>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-4 mb-8">
                        <label htmlFor="quantity" className="font-medium text-gray-700">
                            Quantity:
                        </label>
                        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                            <button
                                type="button"
                                onClick={handleDecrement}
                                className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                aria-label="Decrease quantity"
                            >
                                -
                            </button>
                            <input
                                id="quantity"
                                type="number"
                                min="1"
                                max={product.stock || 99}
                                value={quantity}
                                onChange={(e) =>
                                    setQuantity(Math.max(1, Math.min(parseInt(e.target.value) || 1, product.stock || 99)))
                                }
                                className="w-16 text-center text-gray-900 font-medium border-0 outline-none focus:ring-2 focus:ring-amber-500"
                                aria-label="Select quantity"
                            />
                            <button
                                type="button"
                                onClick={handleIncrement}
                                className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                disabled={product.stock <= quantity}
                                aria-label="Increase quantity"
                            >
                                +
                            </button>
                        </div>
                        {product.stock <= 0 && (
                            <span className="text-red-600 text-sm font-medium">Sold out</span>
                        )}
                    </div>

                    {/* Order Button */}
                    <div className="mb-8">
                        <button
                            onClick={handleOrder}
                            disabled={product.stock <= 0}
                            className={`w-full px-8 py-4 rounded-xl font-semibold text-white transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 ${product.stock > 0
                                ? "bg-amber-600 hover:bg-amber-700 shadow-md hover:shadow-lg"
                                : "bg-gray-300 cursor-not-allowed text-gray-500"
                                }`}
                        >
                            {product.stock > 0 ? `Order Now - Rp ${(product.price * quantity).toLocaleString("id-ID")}` : "Out of Stock"}
                        </button>
                    </div>

                    {/* Trust Badges */}
                    <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t border-gray-100">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            Free Shipping
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            30-Day Return
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-20">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">You May Also Like</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((r) => (
                        <Link
                            key={r}
                            to={`/product/${parseInt(id || "1") + r}`}
                            className="group block border border-gray-200 rounded-xl p-5 bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                        >
                            <div className="relative overflow-hidden rounded-xl aspect-[4/3] mb-4 bg-gray-50">
                                <img
                                    src={`https://picsum.photos/id/${parseInt(id || "1") + r + 50}/400/300`}
                                    alt={`Related product ${r}`}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement
                                        target.src = "https://via.placeholder.com/400x300?text=Related"
                                    }}
                                    loading="lazy"
                                />
                            </div>
                            <h3 className="font-medium text-gray-900 text-sm line-clamp-2 mb-1">
                                Related Product {r}
                            </h3>
                            <p className="text-xs text-gray-500 mb-2">Furniture</p>
                            <p className="text-amber-600 font-semibold text-base">
                                Rp {(99.99 + r * 5).toLocaleString("id-ID")}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProductDetail