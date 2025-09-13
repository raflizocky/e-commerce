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
        <div className="border border-gray-200 rounded-xl p-4 bg-white animate-pulse">
            <div className="aspect-[4/3] bg-gray-200 rounded-xl mb-3"></div>
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
                className="block group border border-gray-200 rounded-xl p-4 bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out text-center focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                aria-label={`View ${product.name}`}
            >
                <div className="relative overflow-hidden rounded-xl aspect-[4/3] mb-3 bg-gray-50">
                    <img
                        src={product.image || "https://via.placeholder.com/400x300"}
                        alt={product.name || "Product image"}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = "https://via.placeholder.com/400x300"
                        }}
                        loading="lazy"
                    />
                </div>

                <h3 className="font-medium text-gray-900 text-sm line-clamp-2 mb-1">
                    {product.name}
                </h3>
                <p className="text-xs text-gray-500 mb-2">{product.category?.name}</p>
                <p className="text-amber-600 font-semibold text-base">
                    {formattedPrice}
                </p>
            </Link>
        )
    }

    return (
        <div>
            <div className="relative -mt-16 w-full h-[400px] sm:h-[500px] lg:h-[600px]">
                <img
                    src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
                    alt="Curated Premium Furniture Collection"
                    className="w-full h-full object-cover"
                    loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col items-center justify-end pb-12 px-6 text-center">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                        Curated Collections
                    </h1>
                    <p className="mt-4 text-lg sm:text-xl text-gray-200 max-w-2xl">
                        Hand-selected masterpieces designed for comfort, elegance, and timeless appeal.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-16">
                {error && (
                    <p className="col-span-full text-center py-8 text-red-500 text-lg font-medium">
                        {error}
                    </p>
                )}

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {loading
                        ? [...Array(4)].map((_, i) => <SkeletonCard key={i} />)
                        : visibleProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                </div>

                {!loading && visibleCount < products.length && (
                    <div className="flex justify-center mt-12">
                        <button
                            onClick={handleShowMore}
                            className="px-8 py-3 bg-white border-2 border-amber-600 text-amber-600 rounded-xl font-medium hover:bg-amber-50 hover:border-amber-700 hover:text-amber-700 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                            aria-label="Load more featured products"
                        >
                            Show More
                        </button>
                    </div>
                )}

                {!loading && products.length === 0 && !error && (
                    <div className="text-center py-16">
                        <svg
                            className="w-16 h-16 text-gray-200 mx-auto mb-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            ></path>
                        </svg>
                        <p className="text-gray-500 text-lg font-medium">
                            No featured products available at the moment.
                        </p>
                        <p className="text-gray-400 text-sm mt-1">
                            Check back soon for new arrivals.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Featured