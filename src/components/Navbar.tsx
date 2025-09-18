import { Link, useNavigate, useLocation } from "react-router-dom"
import { Menu, X } from "lucide-react"
import { useEffect, useState, useCallback } from "react"
import { getProfile, logout } from "../services/auth"
import DesktopNav from "./DesktopNav"
import SearchBar from "./SearchBar"
import UserDropdown from "./UserDropdown"
import MobileMenu from "./MobileNav"

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState<{ name: string } | null>(null);
    const [loadingProfile, setLoadingProfile] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    // Fetch profile on route change
    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    setLoadingProfile(true);
                    const response = await getProfile();
                    setUser(response.data);
                } catch {
                    setUser(null);
                    localStorage.removeItem("token");
                } finally {
                    setLoadingProfile(false);
                }
            } else {
                setUser(null);
                setLoadingProfile(false);
            }
        };
        checkAuth();
    }, [location]);

    const handleLogout = useCallback(async () => {
        try {
            await logout();
        } catch (e) {
            console.warn("Logout failed:", e);
        }
        localStorage.removeItem("token");
        setUser(null);
        navigate("/signin");
        setIsOpen(false);
    }, [navigate]);

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
                            <div
                                key={i}
                                className="h-6 bg-gray-200 rounded w-20 animate-pulse"
                            ></div>
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
        );
    }

    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo + Desktop Nav */}
                    <div className="flex items-center space-x-4">
                        <Link to="/" className="text-2xl font-bold text-amber-600">
                            E-Commerce
                        </Link>
                        <DesktopNav />
                    </div>

                    {/* Search (Desktop Only) */}
                    <div className="hidden md:flex flex-1 max-w-lg justify-center px-4">
                        <SearchBar />
                    </div>

                    {/* Right Side */}
                    <div className="hidden md:flex items-center space-x-3">
                        {user ? (
                            <UserDropdown user={user} onLogout={handleLogout} />
                        ) : (
                            <>
                                <Link
                                    to="/signin"
                                    className="px-4 py-2 rounded-md border border-amber-600 text-amber-600 hover:bg-amber-50 text-sm font-medium"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    to="/signup"
                                    className="px-4 py-2 rounded-md bg-amber-600 text-white hover:bg-amber-700 text-sm font-medium shadow-sm"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 rounded-md text-gray-600 hover:text-amber-600 hover:bg-gray-100"
                    >
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <MobileMenu
                    user={user}
                    onLogout={handleLogout}
                    onClose={() => setIsOpen(false)}
                />
            )}
        </nav>
    );
}
