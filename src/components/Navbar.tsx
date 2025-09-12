import { NavLink, Link, useNavigate } from "react-router-dom"
import { useEffect, useState, useRef } from "react"
import { Menu, X, Search, ChevronDown } from "lucide-react"
import { getProfile, logout } from "../services/auth"

function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [user, setUser] = useState<{ name: string } | null>(null)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement | null>(null)
    const navigate = useNavigate()

    const navClass = "transition hover:text-amber-600 px-2 py-1"

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            getProfile()
                .then((res) => setUser(res))
                .catch(() => {
                    setUser(null)
                    localStorage.removeItem("token")
                })
        }
    }, [])

    const handleLogout = async () => {
        try {
            await logout()
        } catch {
            // ignore error
        }
        localStorage.removeItem("token")
        setUser(null)
        navigate("/signin")
    }

    // Close dropdown if clicking outside
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setDropdownOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-30 items-center">
                    {/* Left: Logo + Menu */}
                    <div className="flex items-center space-x-6">
                        <Link to="/" className="text-2xl font-bold text-amber-600">
                            E-Commerce
                        </Link>

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

                    {/* Middle: Search */}
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

                    {/* Right: Auth / User Dropdown */}
                    <div className="hidden md:flex space-x-4 items-center">
                        {user ? (
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-100 transition"
                                >
                                    <span className="text-gray-700">Hi, {user.name}</span>
                                    <ChevronDown className="h-4 w-4 text-gray-500" />
                                </button>

                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg">
                                        <Link
                                            to="/account"
                                            className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                                            onClick={() => setDropdownOpen(false)}
                                        >
                                            View Profile
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
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
                            </>
                        )}
                    </div>

                    {/* Mobile toggle */}
                    <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu (unchanged) */}
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
                        {user ? (
                            <>
                                <Link
                                    to="/account"
                                    className="block w-full text-center px-4 py-2 rounded border border-amber-600 text-amber-600 hover:bg-amber-50 transition"
                                >
                                    Profile
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-center px-4 py-2 rounded bg-amber-600 text-white hover:bg-amber-700 transition"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
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
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navbar
