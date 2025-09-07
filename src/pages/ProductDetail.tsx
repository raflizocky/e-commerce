import { useParams } from "react-router-dom"
import { useState } from "react"

function ProductDetail() {
    const { id } = useParams<{ id: string }>()
    const [quantity, setQuantity] = useState(1)

    // contoh data dummy
    const product = {
        id,
        name: "Minimalist Wooden Chair",
        price: 129.99,
        description:
            "A beautifully crafted minimalist wooden chair, perfect for your modern living room or office.",
        category: "Furniture",
        stock: 12,
        rating: 4.5,
        images: [
            `https://picsum.photos/id/${parseInt(id || "1") + 100}/600/400`,
            `https://picsum.photos/id/${parseInt(id || "1") + 200}/600/400`,
            `https://picsum.photos/id/${parseInt(id || "1") + 300}/600/400`,
        ],
    }

    const [mainImage, setMainImage] = useState(product.images[0])

    return (
        <div className="max-w-6xl mx-auto py-10 px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Left: Images */}
                <div>
                    <img
                        src={mainImage}
                        alt={product.name}
                        className="w-full h-96 object-cover rounded-lg shadow"
                    />
                    <div className="flex space-x-4 mt-4">
                        {product.images.map((img, i) => (
                            <img
                                key={i}
                                src={img}
                                alt={`thumb-${i}`}
                                onClick={() => setMainImage(img)}
                                className={`w-24 h-24 object-cover rounded cursor-pointer border ${mainImage === img ? "border-amber-600" : "border-gray-300"
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Right: Info */}
                <div>
                    <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                    <p className="text-amber-600 text-2xl font-semibold mb-4">
                        ${product.price}
                    </p>

                    <p className="text-gray-700 mb-6">{product.description}</p>

                    <div className="mb-4">
                        <p>
                            <span className="font-medium">Category:</span> {product.category}
                        </p>
                        <p>
                            <span className="font-medium">Stock:</span> {product.stock} items
                        </p>
                        <p>
                            <span className="font-medium">Rating:</span> ⭐ {product.rating}
                        </p>
                    </div>

                    {/* Quantity selector */}
                    <div className="flex items-center space-x-4 mb-6">
                        <label className="font-medium">Quantity:</label>
                        <div className="flex items-center border rounded">
                            <button
                                className="px-3 py-1"
                                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                            >
                                -
                            </button>
                            <span className="px-4">{quantity}</span>
                            <button
                                className="px-3 py-1"
                                onClick={() => setQuantity((q) => q + 1)}
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex space-x-4">
                        <button className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition">
                            Add to Cart
                        </button>
                        <button className="border px-6 py-3 rounded-lg hover:bg-gray-100 transition">
                            ❤️ Add to Wishlist
                        </button>
                    </div>
                </div>
            </div>

            {/* Related Products */}
            <div className="mt-16">
                <h2 className="text-2xl font-bold mb-6">Related Products</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((r) => (
                        <div
                            key={r}
                            className="border rounded-lg overflow-hidden hover:shadow-lg transition"
                        >
                            <img
                                src={`https://picsum.photos/id/${parseInt(id || "1") + r + 50}/400/300`}
                                alt="related"
                                className="w-full h-40 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="font-medium">Related Product {r}</h3>
                                <p className="text-amber-600 font-semibold mt-2">$99.99</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProductDetail
