import { useState } from "react"
import { Link } from "react-router-dom"

const allProducts = [
    { id: 1, name: "Modern Sofa", category: "Living Room" },
    { id: 2, name: "Wooden Chair", category: "Dining" },
    { id: 3, name: "Minimalist Table", category: "Dining" },
    { id: 4, name: "Cozy Armchair", category: "Living Room" },
    { id: 5, name: "Bookshelf", category: "Office" },
    { id: 6, name: "Bed Frame", category: "Bedroom" },
    { id: 7, name: "Desk Lamp", category: "Office" },
    { id: 8, name: "Coffee Table", category: "Living Room" },
    { id: 9, name: "Wardrobe", category: "Bedroom" },
    { id: 10, name: "Nightstand", category: "Bedroom" },
]

function Products() {
    const [visibleCount, setVisibleCount] = useState(6)

    const visibleProducts = allProducts.slice(0, visibleCount)

    const handleShowMore = () => {
        setVisibleCount((prev) => prev + 6)
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            {/* Grid Products */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {visibleProducts.map((product, i) => (
                    <Link
                        to={`/product/${product.id}`}
                        key={product.id}
                        className="border rounded-lg p-4 text-center hover:shadow block"
                    >
                        <img
                            src={`https://picsum.photos/400/300?random=${product.id + i}`}
                            alt={product.name}
                            className="mx-auto mb-3 rounded"
                        />
                        <h3 className="font-medium">{product.name}</h3>
                        <p className="text-sm text-gray-500">{product.category}</p>
                    </Link>
                ))}
            </div>

            {/* Show More Button */}
            {visibleCount < allProducts.length && (
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
    )
}

export default Products
