import { NavLink, Link } from "react-router-dom"
import { X } from "lucide-react"
import SearchBar from "./SearchBar"

export default function MobileNav({ user, onLogout, onClose }: { user: any, onLogout: () => void, onClose: () => void }) {
    return (
        <div className="fixed inset-0 z-40 overflow-y-auto bg-white bg-opacity-95 backdrop-blur-sm md:hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
                <button
                    onClick={onClose}
                    className="p-1 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                    <X className="h-6 w-6" />
                </button>
            </div>

            {/* Search */}
            <div className="px-4 py-3">
                <SearchBar />
            </div>

            {/* Links */}
            <nav className="flex-1 px-4 space-y-1">
                <NavLink to="/" end className="block rounded-lg px-4 py-3 text-base font-medium hover:bg-gray-50" onClick={onClose}>
                    Home
                </NavLink>
                <NavLink to="/products" className="block rounded-lg px-4 py-3 text-base font-medium hover:bg-gray-50" onClick={onClose}>
                    Shop
                </NavLink>
                <NavLink to="/featured" className="block rounded-lg px-4 py-3 text-base font-medium hover:bg-gray-50" onClick={onClose}>
                    Featured
                </NavLink>
                <NavLink to="/recommended" className="block rounded-lg px-4 py-3 text-base font-medium hover:bg-gray-50" onClick={onClose}>
                    Recommended
                </NavLink>
            </nav>

            {/* Auth */}
            <div className="border-t border-gray-200 p-4 space-y-3">
                {user ? (
                    <>
                        <Link
                            to="/account"
                            className="block w-full rounded-lg bg-gray-50 text-amber-600 px-4 py-3 text-center font-medium hover:bg-gray-100"
                            onClick={onClose}
                        >
                            View Profile
                        </Link>
                        <button
                            onClick={onLogout}
                            className="block w-full rounded-lg bg-amber-600 text-white px-4 py-3 text-center font-medium hover:bg-amber-700"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link
                            to="/signin"
                            className="block w-full rounded-lg border border-amber-600 text-amber-600 px-4 py-3 text-center font-medium hover:bg-amber-50"
                            onClick={onClose}
                        >
                            Sign In
                        </Link>
                        <Link
                            to="/signup"
                            className="block w-full rounded-lg bg-amber-600 text-white px-4 py-3 text-center font-medium hover:bg-amber-700"
                            onClick={onClose}
                        >
                            Sign Up
                        </Link>
                    </>
                )}
            </div>
        </div>
    )
}
