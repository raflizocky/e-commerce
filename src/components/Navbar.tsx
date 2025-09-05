import { NavLink, Link } from "react-router-dom"
import { useState } from "react"
import { Menu, X, Search } from "lucide-react"

function Navbar() {
    const [isOpen, setIsOpen] = useState(false)

    const navClass =
        "transition hover:text-amber-600 px-2 py-1"

    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-30 items-center">

                    {/* Left: Logo + Menu */}
                    <div className="flex items-center space-x-6">
                        {/* Logo */}
                        <Link to="/" className="text-2xl font-bold text-amber-600">
                            E-Commerce
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex space-x-4">
                            <NavLink
                                to="/"
                                end
                                className={({ isActive }) =>
                                    `${navClass} ${isActive ? "text-amber-600" : "text-gray-500"}`
                                }
                            >
                                Home
                            </NavLink>
                            <NavLink
                                to="/products"
                                className={({ isActive }) =>
                                    `${navClass} ${isActive ? "text-amber-600" : "text-gray-500"}`
                                }
                            >
                                Shop
                            </NavLink>
                            <NavLink
                                to="/featured"
                                className={({ isActive }) =>
                                    `${navClass} ${isActive ? "text-amber-600" : "text-gray-500"}`
                                }
                            >
                                Featured
                            </NavLink>
                            <NavLink
                                to="/recommended"
                                className={({ isActive }) =>
                                    `${navClass} ${isActive ? "text-amber-600" : "text-gray-500"}`
                                }
                            >
                                Recommended
                            </NavLink>
                        </div>
                    </div>

                    {/* Middle: Search Box */}
                    <div className="hidden md:flex flex-1 justify-center px-4">
                        <div className="relative w-full max-w-sm">
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="w-full border border-gray-300 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                            />
                            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                    </div>

                    {/* Right Side (Auth Buttons) */}
                    <div className="hidden md:flex space-x-4">
                        <Link
                            to="/signin"
                            className="px-4 py-2 rounded border border-amber-600 text-amber-600 hover:bg-amber-50 transition"
                        >
                            Sign In
                        </Link>
                        <Link
                            to="/signup"
                            className="px-4 py-2 rounded bg-amber-600 text-white hover:bg-amber-700 transition"
                        >
                            Sign Up
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden px-4 pb-4 space-y-2">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full border border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    />
                    <NavLink
                        to="/"
                        end
                        className={({ isActive }) =>
                            `${navClass} block ${isActive ? "text-amber-600" : "text-gray-500"}`
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/products"
                        className={({ isActive }) =>
                            `${navClass} block ${isActive ? "text-amber-600" : "text-gray-500"}`
                        }
                    >
                        Shop
                    </NavLink>
                    <NavLink
                        to="/categories"
                        className={({ isActive }) =>
                            `${navClass} block ${isActive ? "text-amber-600" : "text-gray-500"}`
                        }
                    >
                        Categories
                    </NavLink>
                    <NavLink
                        to="/settings"
                        className={({ isActive }) =>
                            `${navClass} block ${isActive ? "text-amber-600" : "text-gray-500"}`
                        }
                    >
                        Settings
                    </NavLink>
                    <div className="pt-4 space-y-2">
                        <Link
                            to="/signin"
                            className="block w-full text-center px-4 py-2 rounded border border-amber-600 text-amber-600 hover:bg-amber-50 transition"
                        >
                            Sign In
                        </Link>
                        <Link
                            to="/signup"
                            className="block w-full text-center px-4 py-2 rounded bg-amber-600 text-white hover:bg-amber-700 transition"
                        >
                            Sign Up
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navbar
