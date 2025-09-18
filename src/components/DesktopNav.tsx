import { NavLink } from "react-router-dom"

const navClass = "transition-colors duration-200 px-2 py-1 rounded-md"

export default function DesktopNav() {
    return (
        <div className="hidden md:flex space-x-1">
            <NavLink
                to="/"
                end
                className={({ isActive }) =>
                    `${navClass} ${isActive
                        ? "text-amber-600 bg-amber-50 font-medium"
                        : "text-gray-600 hover:text-amber-600"}`
                }
            >
                Home
            </NavLink>
            <NavLink
                to="/products"
                className={({ isActive }) =>
                    `${navClass} ${isActive
                        ? "text-amber-600 bg-amber-50 font-medium"
                        : "text-gray-600 hover:text-amber-600"}`
                }
            >
                Shop
            </NavLink>
            <NavLink
                to="/featured"
                className={({ isActive }) =>
                    `${navClass} ${isActive
                        ? "text-amber-600 bg-amber-50 font-medium"
                        : "text-gray-600 hover:text-amber-600"}`
                }
            >
                Featured
            </NavLink>
            <NavLink
                to="/recommended"
                className={({ isActive }) =>
                    `${navClass} ${isActive
                        ? "text-amber-600 bg-amber-50 font-medium"
                        : "text-gray-600 hover:text-amber-600"}`
                }
            >
                Recommended
            </NavLink>
        </div>
    )
}
