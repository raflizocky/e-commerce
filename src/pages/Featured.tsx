import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getFeaturedProducts } from "../services/product"

interface Product {
    id: number
    name: string
    slug: string
    price: string
    image: string | null
    category: { id: number; name: string }
}

function Featured() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [visibleCount, setVisibleCount] = useState(4)

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true)
            setError(null)
            try {
                const res = await getFeaturedProducts()
                setProducts(res)
            } catch (err) {
                setError("Failed to load featured products. Please try again.")
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        fetchProducts()
    }, [])

    const visibleProducts = products.slice(0, visibleCount)

    const handleShowMore = () => {
        setVisibleCount((prev) => prev + 4)
    }

    const SkeletonCard = () => (
        <div className="border rounded-lg p-4 animate-pulse">
            <div className="bg-gray-200 h-40 w-full rounded mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto"></div>
        </div>
    )

    const ProductCard = ({ product }: { product: Product }) => {
        const price = parseFloat(product.price)
        const formattedPrice = isNaN(price) ? "Rp 0" : `Rp ${price.toLocaleString("id-ID")}`

        return (
            <Link
                to={`/product/${product.id}`}
                className="border rounded-lg p-4 text-center hover:shadow block"
            >
                <div className="w-full h-40 mb-3 rounded overflow-hidden">
                    <img
                        src={product.image || "https://via.placeholder.com/400x300"}
                        alt={product.name || "Product image"}
                        className="w-full h-full object-cover"
                    />
                </div>
                <h3 className="font-medium">{product.name}</h3>
                <p className="text-sm text-gray-500">{product.category?.name}</p>
                <p className="text-amber-600 font-semibold mt-1">{formattedPrice}</p>
            </Link>
        )
    }

    return (
        <div>
            {/* Hero Section */}
            <div className="relative -mt-16 w-full h-[400px] sm:h-[500px]">
                <img
                    src="https://picsum.photos/1600/500?random=20"
                    alt="Featured Furniture"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-center">
                    <h1 className="text-4xl sm:text-5xl font-bold">Featured Furniture</h1>
                    <p className="mt-2 text-lg">Handpicked pieces just for you</p>
                </div>
            </div>

            {/* Featured Products */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                {/* Error Message */}
                {error && (
                    <p className="text-red-500 text-center py-4 mb-8">
                        {error}
                    </p>
                )}

                {/* Products Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                    {loading
                        ? [...Array(4)].map((_, i) => <SkeletonCard key={i} />)
                        : visibleProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                </div>

                {/* Show More Button */}
                {!loading && visibleCount < products.length && (
                    <div className="flex justify-center mt-8">
                        <button
                            onClick={handleShowMore}
                            className="px-6 py-2 bg-amber-600 text-white rounded-lg shadow hover:bg-amber-700 transition"
                        >
                            Show More
                        </button>
                    </div>
                )}

                {/* No Products Message */}
                {!loading && products.length === 0 && !error && (
                    <p className="text-center text-gray-500 mt-8">
                        No featured products available at the moment.
                    </p>
                )}
            </div>
        </div>
    )
}

export default Featured