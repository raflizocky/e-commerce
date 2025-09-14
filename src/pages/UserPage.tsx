import { useState, useEffect } from "react"
import { getProfile, updateProfile } from "../services/auth"

function UserPage() {
    const [activeTab, setActiveTab] = useState<"account" | "wishlist" | "orders">("account")
    const [userInfo, setUserInfo] = useState({
        fullName: "",
        email: "",
        phone: "",
        address: "",
    })
    const [loading, setLoading] = useState(true)
    const [isEditing, setIsEditing] = useState(false)
    const [isSaving, setIsSaving] = useState(false)

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await getProfile() // 👈 Returns { data: { ... } }
                console.log("✅ API Response:", response)

                const profile = response.data

                setUserInfo({
                    fullName: profile.name || "",
                    email: profile.email || "",
                    phone: profile.phone || "",
                    address: profile.address || "",
                })
            } catch (error) {
                console.error("❌ Failed to load profile:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchProfile()
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setUserInfo((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSaving(true)
        try {
            await updateProfile({
                name: userInfo.fullName,
                phone: userInfo.phone,
                address: userInfo.address,
            })
            setUserInfo((prev) => ({
                ...prev,
                fullName: userInfo.fullName,
                phone: userInfo.phone,
                address: userInfo.address,
            }))
            setIsEditing(false)
        } catch (error) {
            console.error("Failed to update profile:", error)
        } finally {
            setIsSaving(false)
        }
    }

    if (loading) {
        return (
            <div className="max-w-5xl mx-auto py-12 px-4">
                <div className="border-b border-gray-200 mb-8 flex space-x-1">
                    {["account", "wishlist", "orders"].map((tab) => (
                        <div key={tab} className="h-8 bg-gray-200 rounded animate-pulse w-24"></div>
                    ))}
                </div>
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="relative h-48 md:h-60 bg-gray-200 animate-pulse"></div>
                    <div className="p-8">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                            <div className="w-24 h-24 rounded-full bg-gray-200 animate-pulse"></div>
                            <div className="flex-1 space-y-3">
                                <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                            </div>
                        </div>
                        <div className="border-t border-gray-100 pt-8 space-y-4">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                                    <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-5xl mx-auto py-12 px-4">
            {/* Tabs — Polished */}
            <div className="border-b border-gray-200 mb-8 flex space-x-1">
                {["account", "wishlist", "orders"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={`relative pb-3 px-4 text-sm font-medium transition-colors duration-200 ${activeTab === tab
                            ? "text-amber-600 border-b-2 border-amber-600"
                            : "text-gray-500 hover:text-gray-700"
                            }`}
                        aria-current={activeTab === tab ? "page" : undefined}
                    >
                        {tab === "account" && "Account"}
                        {tab === "wishlist" && "Wishlist"}
                        {tab === "orders" && "Orders"}
                        {activeTab === tab && (
                            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-amber-600 rounded-full"></span>
                        )}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="bg-gray-50 min-h-[calc(100vh-200px)] pb-12">
                {/* Account Tab */}
                {activeTab === "account" && (
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                        {/* Banner — Using picsum.photos */}
                        <div className="relative h-48 md:h-60">
                            <img
                                src={`https://picsum.photos/id/${Math.floor(Math.random() * 100) + 1}/1200/400`}
                                alt="Profile banner"
                                className="w-full h-full object-cover"
                                loading="lazy"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement
                                    target.src = "https://picsum.photos/id/1/1200/400"
                                }}
                            />
                            <button
                                onClick={() => setIsEditing(true)}
                                className="absolute bottom-4 right-4 bg-black/80 text-white text-sm px-5 py-2 rounded-full hover:bg-black transition-all backdrop-blur-sm"
                                aria-label="Edit profile"
                            >
                                Edit Profile
                            </button>
                        </div>

                        {/* Profile Header */}
                        <div className="p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-white text-3xl font-bold shadow-md">
                                {userInfo.fullName.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex-1">
                                <h1 className="text-2xl font-bold text-gray-900">{userInfo.fullName}</h1>
                                <p className="text-gray-600 mt-1">{userInfo.email}</p>
                            </div>
                        </div>

                        {/* Personal Info Section */}
                        <div className="border-t border-gray-100 p-8">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6">Personal Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Full Name</p>
                                    <p className="font-medium text-gray-900">{userInfo.fullName}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Email Address</p>
                                    <p className="font-medium text-gray-900">{userInfo.email}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Address</p>
                                    <p className="font-medium text-gray-900">{userInfo.address}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Phone Number</p>
                                    <p className="font-medium text-gray-900">{userInfo.phone}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Wishlist Tab */}
                {activeTab === "wishlist" && (
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-8">My Wishlist</h2>
                        <div className="text-center py-16">
                            <svg className="w-16 h-16 text-gray-200 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            <p className="text-gray-500 text-lg font-medium">Your wishlist is empty</p>
                            <p className="text-gray-400 text-sm mt-1">Start adding items you love!</p>
                        </div>
                    </div>
                )}

                {/* Orders Tab */}
                {activeTab === "orders" && (
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-8">My Orders</h2>
                        <div className="text-center py-16">
                            <svg className="w-16 h-16 text-gray-200 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            <p className="text-gray-500 text-lg font-medium">No orders yet</p>
                            <p className="text-gray-400 text-sm mt-1">Your purchase history will appear here.</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Edit Modal — Fully Polished */}
            {isEditing && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="edit-profile-modal"
                    onKeyDown={(e) => e.key === "Escape" && setIsEditing(false)}
                    tabIndex={-1}
                >
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-fadeIn">
                        <div className="p-6">
                            <h2 id="edit-profile-modal" className="text-2xl font-bold text-gray-900 mb-6">
                                Edit Your Profile
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        id="fullName"
                                        name="fullName"
                                        value={userInfo.fullName}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                                        autoFocus
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={userInfo.email}
                                        readOnly
                                        className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 text-gray-500 cursor-not-allowed"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        value={userInfo.address}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={userInfo.phone}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                                    />
                                </div>

                                <div className="flex justify-end space-x-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsEditing(false)}
                                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                                        disabled={isSaving}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSaving}
                                        className="px-6 py-3 bg-amber-600 text-white rounded-xl font-medium hover:bg-amber-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSaving ? (
                                            <>
                                                <svg className="animate-spin w-4 h-4 text-white" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Saving...
                                            </>
                                        ) : (
                                            "Save Changes"
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserPage