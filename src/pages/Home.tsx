import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getFeaturedProducts, getRecommendedProducts } from "../services/product"
import type { Product } from "../components/types"
import { SkeletonCard } from "../components/SkeletonCard"
import { ProductCard } from "../components/ProductCard"

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