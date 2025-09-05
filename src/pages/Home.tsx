import { Link } from "react-router-dom"

function Home() {
    return (
        <div>
            {/* Hero Section */}
            <section className="bg-gray-50 border-b">
                <div className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-8 items-center">
                    {/* Text */}
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

                    {/* Hero Image */}
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
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="border rounded-lg p-4 text-center hover:shadow">
                            <img
                                src={`https://picsum.photos/400/300?random=${i}`}
                                alt={`Product ${i + 1}`}
                                className="mx-auto mb-3 rounded"
                            />
                            <h3 className="font-medium">Furniture {i + 1}</h3>
                            <p className="text-sm text-gray-500">Category</p>
                        </div>
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
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="border rounded-lg p-4 text-center hover:shadow">
                            <img
                                src={`https://picsum.photos/400/300?random=${i + 20}`}
                                alt={`Recommended ${i + 1}`}
                                className="mx-auto mb-3 rounded"
                            />
                            <h3 className="font-medium">Item {i + 1}</h3>
                            <p className="text-sm text-gray-500">Category</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default Home
