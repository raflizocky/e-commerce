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

const ProductCard = ({ product }: { product: Product }) => (
    <Link
        to={`/product/${product.id}`}
        className="block group border border-gray-200 rounded-xl p-4 bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out text-center focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
        aria-label={`View ${product.name}`}
    >
        <div className="relative overflow-hidden rounded-lg mb-3 aspect-[4/3] bg-gray-100">
            <img
                src={product.image || "https://via.placeholder.com/400x300"}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = "https://via.placeholder.com/400x300"
                }}
                loading="lazy"
            />
        </div>
        <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">{product.name}</h3>
        <p className="text-sm text-gray-500 mb-2">{product.category?.name}</p>
        <p className="text-amber-600 font-bold text-lg">
            Rp {parseInt(product.price).toLocaleString("id-ID")}
        </p>
    </Link>
)

const SkeletonCard = () => (
    <div className="border border-gray-200 rounded-xl p-4 bg-white animate-pulse">
        <div className="aspect-[4/3] bg-gray-200 rounded-lg mb-3"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto"></div>
    </div>
)

function Home() {
    const [featured, setFeatured] = useState<Product[]>([])
    const [recommended, setRecommended] = useState<Product[]>([])
    const [loadingFeatured, setLoadingFeatured] = useState(true)
    const [loadingRecommended, setLoadingRecommended] = useState(true)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const featuredData = await getFeaturedProducts()
                setFeatured(featuredData)
            } catch (error) {
                console.error("Failed to load featured products:", error)
            } finally {
                setLoadingFeatured(false)
            }

            try {
                const recommendedData = await getRecommendedProducts()
                setRecommended(recommendedData)
            } catch (error) {
                console.error("Failed to load recommended products:", error)
            } finally {
                setLoadingRecommended(false)
            }
        }

        fetchProducts()
    }, [])

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-amber-50 to-amber-100 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                            Make your home <br />
                            <span className="text-amber-600">your sanctuary</span>
                        </h1>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            Discover timeless furniture that brings comfort and style into every corner of your home.
                            Affordable, durable, and designed with you in mind.
                        </p>
                        <Link
                            to="/products"
                            className="inline-block px-8 py-3 bg-amber-600 text-white font-medium rounded-lg shadow-md hover:bg-amber-700 focus:ring-4 focus:ring-amber-300 transition-all duration-200 transform hover:scale-105"
                        >
                            Shop Now
                        </Link>
                    </div>
                    <div className="flex justify-center">
                        <img
                            src="https://images.unsplash.com/photo-1615874959474-d609969a20ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                            alt="Modern living room with elegant furniture"
                            className="rounded-2xl shadow-xl max-w-full h-auto object-cover"
                            loading="eager"
                        />
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Featured Products</h2>
                        <Link
                            to="/products"
                            className="mt-4 sm:mt-0 text-amber-600 font-medium hover:text-amber-700 underline-offset-4 hover:underline transition-colors"
                            aria-label="View all featured products"
                        >
                            See All →
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {loadingFeatured
                            ? [...Array(5)].map((_, i) => <SkeletonCard key={i} />)
                            : featured.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                    </div>
                </div>
            </section>

            {/* Recommended Products */}
            <section className="py-12 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Recommended For You</h2>
                        <Link
                            to="/products"
                            className="mt-4 sm:mt-0 text-amber-600 font-medium hover:text-amber-700 underline-offset-4 hover:underline transition-colors"
                            aria-label="View all recommended products"
                        >
                            See All →
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {loadingRecommended
                            ? [...Array(5)].map((_, i) => <SkeletonCard key={i} />)
                            : recommended.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home