import { useState } from "react"

const featuredProducts = [
    { id: 1, name: "Luxury Sofa", category: "Living Room" },
    { id: 2, name: "Premium Wooden Chair", category: "Dining" },
    { id: 3, name: "Designer Table", category: "Dining" },
    { id: 4, name: "Velvet Armchair", category: "Living Room" },
    { id: 5, name: "Glass Coffee Table", category: "Living Room" },
    { id: 6, name: "Modern Bookshelf", category: "Office" },
    { id: 7, name: "King Size Bed", category: "Bedroom" },
    { id: 8, name: "Wardrobe Deluxe", category: "Bedroom" },
]

function Featured() {
    const [visibleCount, setVisibleCount] = useState(4)
    const visibleProducts = featuredProducts.slice(0, visibleCount)

    const handleShowMore = () => {
        setVisibleCount((prev) => prev + 4)
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
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                    {visibleProducts.map((product, i) => (
                        <div key={product.id} className="border rounded-lg p-4 text-center hover:shadow">
                            <img
                                src={`https://picsum.photos/400/300?random=${product.id + i + 30}`}
                                alt={product.name}
                                className="mx-auto mb-3 rounded"
                            />
                            <h3 className="font-medium">{product.name}</h3>
                            <p className="text-sm text-gray-500">{product.category}</p>
                        </div>
                    ))}
                </div>

                {/* Show More */}
                {visibleCount < featuredProducts.length && (
                    <div className="flex justify-center mt-8">
                        <button
                            onClick={handleShowMore}
                            className="px-6 py-2 bg-amber-600 text-white rounded-lg shadow hover:bg-amber-700 transition"
                        >
                            Show More
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Featured
