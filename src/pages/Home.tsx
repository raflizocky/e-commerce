import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getFeaturedProducts, getRecommendedProducts } from "../services/product"

interface Product {
    id: number
    name: string
    slug: string
    price: string
    image: string | null
    category: { id: number; name: string }
}

function Home() {
    const [featured, setFeatured] = useState<Product[]>([])
    const [recommended, setRecommended] = useState<Product[]>([])
    const [loadingFeatured, setLoadingFeatured] = useState(true)
    const [loadingRecommended, setLoadingRecommended] = useState(true)

    useEffect(() => {
        getFeaturedProducts()
            .then(setFeatured)
            .catch(console.error)
            .finally(() => setLoadingFeatured(false))

        getRecommendedProducts()
            .then(setRecommended)
            .catch(console.error)
            .finally(() => setLoadingRecommended(false))
    }, [])

    // 🔹 Skeleton card component
    const SkeletonCard = () => (
        <div className="border rounded-lg p-4 animate-pulse">
            <div className="bg-gray-200 h-40 w-full rounded mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto"></div>
        </div>
    )

    return (
        <div>
            {/* Hero Section */}
            <section className="bg-gray-50 border-b">
                <div className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-8 items-center">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 leading-snug">
                            Make your home <br />
                            <span className="text-amber-600">your sanctuary</span>
                        </h1>
                        <p className="mt-4 text-gray-600">
                            Discover timeless furniture that brings comfort and style into
                            every corner of your home. Affordable, durable, and designed
                            with you in mind.
                        </p>
                        <Link
                            to="/products"
                            className="mt-6 inline-block px-6 py-3 bg-amber-600 text-white rounded-lg shadow hover:bg-amber-700 transition"
                        >
                            Shop Now
                        </Link>
                    </div>
                    <div className="flex justify-center">
                        <img
                            src="https://images.unsplash.com/photo-1615874959474-d609969a20ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                            alt="Modern furniture"
                            className="rounded-lg shadow-md"
                        />
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="max-w-7xl mx-auto px-4 py-12">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold">Featured Products</h2>
                    <Link to="/products" className="text-amber-600 hover:underline">
                        See All
                    </Link>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                    {loadingFeatured
                        ? [...Array(8)].map((_, i) => <SkeletonCard key={i} />)
                        : featured.map((product) => (
                            <Link
                                key={product.id}
                                to={`/product/${product.id}`}
                                className="border rounded-lg p-4 text-center hover:shadow block"
                            >
                                <img
                                    src={product.image || "https://via.placeholder.com/400x300"}
                                    alt={product.name}
                                    className="mx-auto mb-3 rounded h-40 w-full object-cover"
                                />
                                <h3 className="font-medium">{product.name}</h3>
                                <p className="text-sm text-gray-500">
                                    {product.category?.name}
                                </p>
                                <p className="text-amber-600 font-semibold mt-1">
                                    Rp {parseInt(product.price).toLocaleString("id-ID")}
                                </p>
                            </Link>
                        ))}
                </div>
            </section>

            {/* Recommended Products */}
            <section className="max-w-7xl mx-auto px-4 py-12">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold">Recommended Products</h2>
                    <Link to="/products" className="text-amber-600 hover:underline">
                        See All
                    </Link>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                    {loadingRecommended
                        ? [...Array(6)].map((_, i) => <SkeletonCard key={i} />)
                        : recommended.map((product) => (
                            <Link
                                key={product.id}
                                to={`/product/${product.id}`}
                                className="border rounded-lg p-4 text-center hover:shadow block"
                            >
                                <img
                                    src={product.image || "https://via.placeholder.com/400x300"}
                                    alt={product.name}
                                    className="mx-auto mb-3 rounded h-40 w-full object-cover"
                                />
                                <h3 className="font-medium">{product.name}</h3>
                                <p className="text-sm text-gray-500">
                                    {product.category?.name}
                                </p>
                                <p className="text-amber-600 font-semibold mt-1">
                                    Rp {parseInt(product.price).toLocaleString("id-ID")}
                                </p>
                            </Link>
                        ))}
                </div>
            </section>
        </div>
    )
}

export default Home
