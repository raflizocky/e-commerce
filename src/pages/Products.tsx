import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getProducts } from "../services/product"

interface Product {
    id: number
    name: string
    slug: string
    price: string
    image: string | null
    category: { id: number; name: string }
}

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
                setHasMore(false) // No more data
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
        <div className="max-w-7xl mx-auto px-4 py-12">
            {/* Grid Products */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {/* Show skeletons only on first load */}
                {loading && page === 1
                    ? [...Array(6)].map((_, i) => <SkeletonCard key={i} />)
                    : products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
            </div>

            {/* Error Message */}
            {error && (
                <p className="col-span-full text-red-500 text-center py-4 mt-8">
                    {error}
                </p>
            )}

            {/* Show More Button */}
            {!loading && hasMore && (
                <div className="flex justify-center mt-8">
                    <button
                        onClick={() => {
                            setPage((prev) => prev + 1)
                            fetchProducts(page + 1)
                        }}
                        className="px-6 py-2 bg-amber-600 text-white rounded-lg shadow hover:bg-amber-700 transition"
                    >
                        Show More
                    </button>
                </div>
            )}

            {/* Show "No More Products" when done */}
            {!hasMore && !loading && products.length > 0 && (
                <p className="text-center text-gray-500 mt-8">
                    That's all for now!
                </p>
            )}
        </div>
    )
}

export default Products