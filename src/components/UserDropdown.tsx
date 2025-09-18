import { Link } from "react-router-dom"
import { ChevronDown } from "lucide-react"
import { useRef, useState, useEffect } from "react"

export default function UserDropdown({ user, onLogout }: { user: { name: string }, onLogout: () => void }) {
    const [open, setOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    // click outside to close dropdown
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 rounded-full px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors">
                <span>Hi, {user.name}</span>
                <ChevronDown
                    className={`h-4 w-4 text-gray-500 transition-transform ${open ? "rotate-180" : ""}`}
                />
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl py-1 z-50 ring-1 ring-black ring-opacity-5">
                    <Link
                        to="/account"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setOpen(false)}
                    >
                        View Profile
                    </Link>
                    <button
                        onClick={onLogout}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    )
}
