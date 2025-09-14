import { Link } from "react-router-dom"
import type { Product } from "../components/types"

export const ProductCard = ({ product }: { product: Product }) => {
    const price = parseFloat(product.price)
    const formattedPrice = isNaN(price) ? "Rp 0" : `Rp ${price.toLocaleString("id-ID")}`

    return (
        <Link
            to={`/product/${product.id}`}
            className="block group border border-gray-200 rounded-xl p-4 bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out text-center focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
            aria-label={`View ${product.name}`}
        >
            <div className="relative overflow-hidden rounded-xl aspect-[4/3] mb-3 bg-gray-50">
                <img
                    src={product.image || "https://via.placeholder.com/400x300"}
                    alt={product.name || "Product image"}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = "https://via.placeholder.com/400x300"
                    }}
                    loading="lazy"
                />
            </div>

            <h3 className="font-medium text-gray-900 text-sm line-clamp-2 mb-1">
                {product.name}
            </h3>
            <p className="text-xs text-gray-500 mb-2">{product.category?.name}</p>
            <p className="text-amber-600 font-semibold text-base">
                {formattedPrice}
            </p>
        </Link>
    )
}
