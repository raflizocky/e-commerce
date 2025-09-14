import { NavLink, Link, useNavigate, useLocation } from "react-router-dom"
import { useEffect, useState, useRef, useCallback } from "react"
import { Menu, X, Search, ChevronDown } from "lucide-react"
import { getProfile, logout } from "../services/auth"

function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [user, setUser] = useState<{ name: string } | null>(null)
    const [loadingProfile, setLoadingProfile] = useState(true)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const mobileMenuRef = useRef<HTMLDivElement>(null)
    const navigate = useNavigate()
    const location = useLocation() // 👈 NEW: Detect route changes

    const navClass = "transition-colors duration-200 px-2 py-1 rounded-md"

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem("token")
            if (token) {
                setLoadingProfile(true)
                try {
                    const response = await getProfile() // 👈 Returns { data: { ... } }
                    setUser(response.data)
                } catch (error) {
                    console.warn("Failed to load profile:", error)
                    setUser(null)
                    localStorage.removeItem("token") // Clean up invalid token
                } finally {
                    setLoadingProfile(false)
                }
            } else {
                setUser(null)
                setLoadingProfile(false)
            }
        }

        checkAuth()
    }, [location])

    const handleLogout = useCallback(async () => {
        try {
            await logout()
        } catch (error) {
            console.warn("Logout failed:", error)
        }
        localStorage.removeItem("token")
        setUser(null)
        navigate("/signin")
        setIsOpen(false)
    }, [navigate])

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target as Node)
            ) {
                setDropdownOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    // Close mobile menu on escape or outside click
    useEffect(() => {
        function handleEscape(e: KeyboardEvent) {
            if (e.key === "Escape") setIsOpen(false)
        }

        function handleClickOutsideMenu(e: MouseEvent) {
            if (
                mobileMenuRef.current &&
                !mobileMenuRef.current.contains(e.target as Node) &&
                isOpen
            ) {
                setIsOpen(false)
            }
        }

        document.addEventListener("keydown", handleEscape)
        document.addEventListener("mousedown", handleClickOutsideMenu)

        return () => {
            document.removeEventListener("keydown", handleEscape)
            document.removeEventListener("mousedown", handleClickOutsideMenu)
        }
    }, [isOpen])

    // Prevent body scroll on mobile menu open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }
        return () => {
            document.body.style.overflow = "unset"
        }
    }, [isOpen])

    // Show skeleton while loading profile
    if (loadingProfile) {
        return (
            <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    {/* Logo */}
                    <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
                    {/* Desktop Nav */}
                    <div className="hidden md:flex space-x-4">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="h-6 bg-gray-200 rounded w-20 animate-pulse"></div>
                        ))}
                    </div>
                    {/* Auth Buttons */}
                    <div className="hidden md:flex space-x-3">
                        <div className="h-9 bg-gray-200 rounded w-24 animate-pulse"></div>
                        <div className="h-9 bg-gray-200 rounded w-24 animate-pulse"></div>
                    </div>
                    {/* Mobile toggle */}
                    <div className="md:hidden h-6 bg-gray-200 rounded w-8 animate-pulse"></div>
                </div>
            </nav>
        )
    }

    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo & Mobile Menu Button */}
                    <div className="flex items-center space-x-4">
                        <Link to="/" className="text-2xl font-bold text-amber-600">
                            E-Commerce
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex space-x-1">
                            <NavLink
                                to="/"
                                end
                                className={({ isActive }) =>
                                    `${navClass} ${isActive
                                        ? "text-amber-600 bg-amber-50 font-medium"
                                        : "text-gray-600 hover:text-amber-600"
                                    }`
                                }
                            >
                                Home
                            </NavLink>
                            <NavLink
                                to="/products"
                                className={({ isActive }) =>
                                    `${navClass} ${isActive
                                        ? "text-amber-600 bg-amber-50 font-medium"
                                        : "text-gray-600 hover:text-amber-600"
                                    }`
                                }
                            >
                                Shop
                            </NavLink>
                            <NavLink
                                to="/featured"
                                className={({ isActive }) =>
                                    `${navClass} ${isActive
                                        ? "text-amber-600 bg-amber-50 font-medium"
                                        : "text-gray-600 hover:text-amber-600"
                                    }`
                                }
                            >
                                Featured
                            </NavLink>
                            <NavLink
                                to="/recommended"
                                className={({ isActive }) =>
                                    `${navClass} ${isActive
                                        ? "text-amber-600 bg-amber-50 font-medium"
                                        : "text-gray-600 hover:text-amber-600"
                                    }`
                                }
                            >
                                Recommended
                            </NavLink>
                        </div>
                    </div>

                    {/* Centered Search Bar (Desktop Only) */}
                    <div className="hidden md:flex flex-1 max-w-lg justify-center px-4">
                        <div className="relative w-full">
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
                    </div>

                    {/* Right: Auth / User Dropdown (Desktop) */}
                    <div className="hidden md:flex items-center space-x-3">
                        {user ? (
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    className="flex items-center gap-2 rounded-full px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-colors"
                                    aria-expanded={dropdownOpen}
                                    aria-haspopup="true"
                                >
                                    <span>Hi, {user.name}</span>
                                    <ChevronDown
                                        className={`h-4 w-4 text-gray-500 transition-transform ${dropdownOpen ? "rotate-180" : ""
                                            }`}
                                        aria-hidden="true"
                                    />
                                </button>

                                {dropdownOpen && (
                                    <div
                                        className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl py-1 z-50 ring-1 ring-black ring-opacity-5 animate-fadeIn"
                                        role="menu"
                                        aria-orientation="vertical"
                                    >
                                        <Link
                                            to="/account"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                            onClick={() => setDropdownOpen(false)}
                                            role="menuitem"
                                        >
                                            View Profile
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                            role="menuitem"
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
                                    className="px-4 py-2 rounded-md border border-amber-600 text-amber-600 hover:bg-amber-50 text-sm font-medium transition-colors"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    to="/signup"
                                    className="px-4 py-2 rounded-md bg-amber-600 text-white hover:bg-amber-700 text-sm font-medium transition-colors shadow-sm"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Toggle Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 rounded-md text-gray-600 hover:text-amber-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-500 transition-colors"
                        aria-expanded={isOpen}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div
                    ref={mobileMenuRef}
                    className="fixed inset-0 z-40 overflow-y-auto bg-white bg-opacity-95 backdrop-blur-sm md:hidden"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="mobile-menu-title"
                >
                    <div className="flex flex-col h-full">
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-gray-200">
                            <h2 id="mobile-menu-title" className="text-lg font-semibold text-gray-900">
                                Menu
                            </h2>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                aria-label="Close menu"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        {/* Search Bar (Mobile) */}
                        <div className="px-4 py-3">
                            <div className="relative">
                                <Search
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                />
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    className="w-full rounded-full border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                    aria-label="Search products"
                                    autoFocus
                                />
                            </div>
                        </div>

                        {/* Navigation Links */}
                        <nav className="flex-1 px-4 space-y-1">
                            <NavLink
                                to="/"
                                end
                                className={({ isActive }) =>
                                    `block rounded-lg px-4 py-3 text-base font-medium transition-colors ${isActive
                                        ? "bg-amber-50 text-amber-600"
                                        : "text-gray-700 hover:bg-gray-50"
                                    }`
                                }
                                onClick={() => setIsOpen(false)}
                            >
                                Home
                            </NavLink>
                            <NavLink
                                to="/products"
                                className={({ isActive }) =>
                                    `block rounded-lg px-4 py-3 text-base font-medium transition-colors ${isActive
                                        ? "bg-amber-50 text-amber-600"
                                        : "text-gray-700 hover:bg-gray-50"
                                    }`
                                }
                                onClick={() => setIsOpen(false)}
                            >
                                Shop
                            </NavLink>
                            <NavLink
                                to="/featured"
                                className={({ isActive }) =>
                                    `block rounded-lg px-4 py-3 text-base font-medium transition-colors ${isActive
                                        ? "bg-amber-50 text-amber-600"
                                        : "text-gray-700 hover:bg-gray-50"
                                    }`
                                }
                                onClick={() => setIsOpen(false)}
                            >
                                Featured
                            </NavLink>
                            <NavLink
                                to="/recommended"
                                className={({ isActive }) =>
                                    `block rounded-lg px-4 py-3 text-base font-medium transition-colors ${isActive
                                        ? "bg-amber-50 text-amber-600"
                                        : "text-gray-700 hover:bg-gray-50"
                                    }`
                                }
                                onClick={() => setIsOpen(false)}
                            >
                                Recommended
                            </NavLink>
                            <NavLink
                                to="/categories"
                                className={({ isActive }) =>
                                    `block rounded-lg px-4 py-3 text-base font-medium transition-colors ${isActive
                                        ? "bg-amber-50 text-amber-600"
                                        : "text-gray-700 hover:bg-gray-50"
                                    }`
                                }
                                onClick={() => setIsOpen(false)}
                            >
                                Categories
                            </NavLink>
                            <NavLink
                                to="/settings"
                                className={({ isActive }) =>
                                    `block rounded-lg px-4 py-3 text-base font-medium transition-colors ${isActive
                                        ? "bg-amber-50 text-amber-600"
                                        : "text-gray-700 hover:bg-gray-50"
                                    }`
                                }
                                onClick={() => setIsOpen(false)}
                            >
                                Settings
                            </NavLink>
                        </nav>

                        {/* Auth Actions */}
                        <div className="border-t border-gray-200 p-4 space-y-3">
                            {user ? (
                                <>
                                    <Link
                                        to="/account"
                                        className="block w-full rounded-lg bg-gray-50 text-amber-600 px-4 py-3 text-center font-medium hover:bg-gray-100 transition-colors"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        View Profile
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full rounded-lg bg-amber-600 text-white px-4 py-3 text-center font-medium hover:bg-amber-700 transition-colors"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/signin"
                                        className="block w-full rounded-lg border border-amber-600 text-amber-600 px-4 py-3 text-center font-medium hover:bg-amber-50 transition-colors"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Sign In
                                    </Link>
                                    <Link
                                        to="/signup"
                                        className="block w-full rounded-lg bg-amber-600 text-white px-4 py-3 text-center font-medium hover:bg-amber-700 transition-colors"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Sign Up
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navbar