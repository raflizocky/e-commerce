import { useEffect, useState } from "react"
import { getProducts } from "../services/product"
import type { Product } from "../components/types"
import { SkeletonCard } from "../components/SkeletonCard"
import { ProductCard } from "../components/ProductCard"

function Products() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)

    const fetchProducts = async (pageNum: number) => {
        setLoading(true)
        setError(null)
        try {
            const res = await getProducts(pageNum)
            if (res.length === 0) {
                setHasMore(false)
            } else {
                if (pageNum === 1) {
                    setProducts(res)
                } else {
                    setProducts((prev) => [...prev, ...res])
                }
                setHasMore(res.length === 6) // Assuming per_page is 6
            }
        } catch (err) {
            setError("Failed to load products. Please try again.")
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    // Initial load
    useEffect(() => {
        fetchProducts(1)
    }, [])

    return (
        <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {loading && page === 1
                    ? [...Array(6)].map((_, i) => <SkeletonCard key={i} />)
                    : products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
            </div>

            {error && (
                <p className="col-span-full text-center py-8 text-gray-600 text-lg">
                    {error}
                </p>
            )}

            {!loading && hasMore && (
                <div className="flex justify-center mt-16">
                    <button
                        onClick={() => {
                            setPage((prev) => prev + 1)
                            fetchProducts(page + 1)
                        }}
                        className="px-8 py-3 bg-white border-2 border-amber-600 text-amber-600 rounded-xl font-medium hover:bg-amber-50 hover:border-amber-700 hover:text-amber-700 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                    >
                        Load More Products
                    </button>
                </div>
            )}

            {!hasMore && !loading && products.length > 0 && (
                <div className="text-center py-16">
                    <svg
                        className="w-12 h-12 text-gray-200 mx-auto mb-4"
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
                        You’ve seen everything!
                    </p>
                    <p className="text-gray-400 text-sm mt-1">
                        Check back later for new arrivals.
                    </p>
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
                            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                        ></path>
                    </svg>
                    <p className="text-gray-500 text-lg font-medium">
                        No products found
                    </p>
                    <p className="text-gray-400 text-sm mt-1">
                        Try adjusting your filters or browse our categories.
                    </p>
                </div>
            )}
        </div>
    )
}

export default Products