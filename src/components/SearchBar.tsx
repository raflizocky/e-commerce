import { Search } from "lucide-react"

export default function SearchBar({ className = "" }) {
    return (
        <div className={`relative w-full ${className}`}>
            <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                aria-hidden="true"
            />
            <input
                type="text"
                placeholder="Search products..."
                className="w-full rounded-full border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent shadow-sm transition-all"
                aria-label="Search products"
            />
        </div>
    )
}
