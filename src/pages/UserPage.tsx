import { useState } from "react"

function UserPage() {
    const [activeTab, setActiveTab] = useState("account")

    // state user info
    const [userInfo, setUserInfo] = useState({
        fullName: "Rafli Zocky",
        email: "raflizocky@gmail.com",
        address: "Jl. Merdeka No. 45, Jakarta",
        phone: "+62 812 3456 7890",
        joined: "September 7, 2024",
    })

    const [isEditing, setIsEditing] = useState(false)

    // handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setUserInfo((prev) => ({ ...prev, [name]: value }))
    }

    return (
        <div className="max-w-5xl mx-auto py-10">
            {/* Tabs */}
            <div className="border-b mb-6 flex space-x-6">
                {["account", "wishlist", "orders"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-2 px-1 text-sm font-medium transition ${activeTab === tab
                                ? "border-b-2 border-amber-600 text-amber-600"
                                : "text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        {tab === "account" && "Account"}
                        {tab === "wishlist" && "My Wish List"}
                        {tab === "orders" && "My Orders"}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div>
                {activeTab === "account" && (
                    <div className="bg-white rounded-lg shadow p-6">
                        {/* Banner */}
                        <div className="relative">
                            <img
                                src="https://picsum.photos/1000/200"
                                alt="cover"
                                className="w-full h-40 object-cover rounded-lg"
                            />
                            <button
                                onClick={() => setIsEditing(true)}
                                className="absolute bottom-3 right-3 bg-black text-white text-sm px-4 py-2 rounded"
                            >
                                Edit Account
                            </button>
                        </div>

                        {/* Profile */}
                        <div className="mt-6 flex items-center space-x-4">
                            <div className="w-20 h-20 rounded-full bg-gray-400 flex items-center justify-center text-white text-3xl font-bold">
                                {userInfo.fullName.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <h2 className="text-xl font-bold">{userInfo.fullName}</h2>
                                <p className="text-gray-600">{userInfo.email}</p>
                            </div>
                        </div>

                        {/* User Info */}
                        <div className="mt-8">
                            <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <p className="text-sm text-gray-500">Full Name</p>
                                    <p className="font-medium">{userInfo.fullName}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Email</p>
                                    <p className="font-medium">{userInfo.email}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Address</p>
                                    <p className="font-medium">{userInfo.address}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Mobile Phone</p>
                                    <p className="font-medium">{userInfo.phone}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Date Joined</p>
                                    <p className="font-medium">{userInfo.joined}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Wishlist */}
                {activeTab === "wishlist" && (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">My Wishlist</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                            {[1, 2, 3].map((id) => (
                                <div
                                    key={id}
                                    className="border rounded-lg p-4 text-center hover:shadow"
                                >
                                    <img
                                        src={`https://picsum.photos/400/300?random=${id + 50}`}
                                        alt="Wishlist item"
                                        className="mb-3 rounded"
                                    />
                                    <h3 className="font-medium">Product {id}</h3>
                                    <button className="mt-2 px-3 py-1 bg-amber-600 text-white rounded text-sm hover:bg-amber-700">
                                        Move to Cart
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Orders */}
                {activeTab === "orders" && (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">My Orders</h2>
                        <ul className="divide-y border rounded-lg bg-white">
                            {[1, 2].map((order) => (
                                <li
                                    key={order}
                                    className="p-4 flex justify-between items-center"
                                >
                                    <div>
                                        <p className="font-medium">Order #{1000 + order}</p>
                                        <p className="text-sm text-gray-500">
                                            2 items • Placed on 2024-09-05
                                        </p>
                                    </div>
                                    <span className="text-sm px-3 py-1 bg-green-100 text-green-700 rounded-full">
                                        Delivered
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* Edit Modal */}
            {isEditing && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault()
                                setIsEditing(false)
                            }}
                            className="space-y-4"
                        >
                            <div>
                                <label className="block text-sm text-gray-600">Full Name</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={userInfo.fullName}
                                    onChange={handleChange}
                                    className="w-full border px-3 py-2 rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-600">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={userInfo.email}
                                    onChange={handleChange}
                                    className="w-full border px-3 py-2 rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-600">Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={userInfo.address}
                                    onChange={handleChange}
                                    className="w-full border px-3 py-2 rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-600">Mobile Phone</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={userInfo.phone}
                                    onChange={handleChange}
                                    className="w-full border px-3 py-2 rounded"
                                />
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-end space-x-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserPage
