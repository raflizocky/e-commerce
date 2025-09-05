import { useState } from "react"

const recommendedProducts = [
    { id: 1, name: "Ergonomic Office Chair", category: "Office" },
    { id: 2, name: "Minimalist Desk", category: "Office" },
    { id: 3, name: "Classic Bookshelf", category: "Living Room" },
    { id: 4, name: "Wooden Nightstand", category: "Bedroom" },
    { id: 5, name: "Modern Lamp", category: "Decor" },
    { id: 6, name: "Rattan Chair", category: "Outdoor" },
    { id: 7, name: "Compact Wardrobe", category: "Bedroom" },
    { id: 8, name: "Marble Coffee Table", category: "Living Room" },
]

function Recommended() {
    const [visibleCount, setVisibleCount] = useState(4)
    const visibleProducts = recommendedProducts.slice(0, visibleCount)

    const handleShowMore = () => {
        setVisibleCount((prev) => prev + 4)
    }

    return (
        <div>
            {/* Hero Section */}
            <div className="relative -mt-16 w-full h-[400px] sm:h-[500px]">
                <img
                    src="https://picsum.photos/1600/500?random=50"
                    alt="Recommended Furniture"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-center">
                    <h1 className="text-4xl sm:text-5xl font-bold">Recommended for You</h1>
                    <p className="mt-2 text-lg">Curated picks to match your style</p>
                </div>
            </div>

            {/* Recommended Products */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                    {visibleProducts.map((product, i) => (
                        <div key={product.id} className="border rounded-lg p-4 text-center hover:shadow">
                            <img
                                src={`https://picsum.photos/400/300?random=${product.id + i + 100}`}
                                alt={product.name}
                                className="mx-auto mb-3 rounded"
                            />
                            <h3 className="font-medium">{product.name}</h3>
                            <p className="text-sm text-gray-500">{product.category}</p>
                        </div>
                    ))}
                </div>

                {/* Show More */}
                {visibleCount < recommendedProducts.length && (
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

export default Recommended
