import { useEffect, useState } from "react"
import { getRecommendedProducts } from "../services/product"
import type { Product } from "../components/types"
import { SkeletonCard } from "../components/SkeletonCard"
import { ProductCard } from "../components/ProductCard"

function Recommended() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [visibleCount, setVisibleCount] = useState(4)

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true)
            setError(null)
            try {
                const res = await getRecommendedProducts()
                setProducts(res)
            } catch (err) {
                setError("Failed to load recommended products. Please try again.")
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

    return (
        <div>
            <div className="relative -mt-16 w-full h-[400px] sm:h-[500px] lg:h-[600px]">
                <img
                    src="https://images.unsplash.com/photo-1505873274491-bb8f650a58c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
                    alt="Personalized Furniture Recommendations"
                    className="w-full h-full object-cover"
                    loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col items-center justify-end pb-12 px-6 text-center">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                        Recommended for You
                    </h1>
                    <p className="mt-4 text-lg sm:text-xl text-gray-200 max-w-2xl">
                        Thoughtfully selected pieces based on your taste and browsing behavior.
                    </p>
                </div>
            </div>

            {/* Recommended Products */}
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
                            aria-label="Load more recommended products"
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
                            No recommended products available at the moment.
                        </p>
                        <p className="text-gray-400 text-sm mt-1">
                            Explore our collection to discover your next favorite piece.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Recommended