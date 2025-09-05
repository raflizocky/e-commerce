import { Link } from "react-router-dom"
import { FaGoogle, FaFacebookF } from "react-icons/fa"

function SignUp() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow">
                <h2 className="text-2xl font-bold text-center text-amber-600">Sign Up</h2>
                <p className="text-sm text-gray-500 text-center mt-1">
                    Create a new account to start shopping.
                </p>

                {/* Email Sign Up Form */}
                <form className="mt-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input
                            type="text"
                            placeholder="John Doe"
                            className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-amber-500 focus:border-amber-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-amber-500 focus:border-amber-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-amber-500 focus:border-amber-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition"
                    >
                        Sign Up
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center my-6">
                    <hr className="flex-1 border-gray-300" />
                    <span className="px-3 text-sm text-gray-500">or sign up with</span>
                    <hr className="flex-1 border-gray-300" />
                </div>

                {/* Social Sign Up */}
                <div className="flex space-x-3">
                    <button className="flex-1 flex items-center justify-center gap-2 py-2 border rounded-lg hover:bg-gray-50">
                        <FaGoogle className="text-red-500" />
                        Google
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 py-2 border rounded-lg hover:bg-gray-50">
                        <FaFacebookF className="text-blue-600" />
                        Facebook
                    </button>
                </div>

                <p className="text-sm text-gray-600 text-center mt-6">
                    Already have an account?{" "}
                    <Link to="/signin" className="text-amber-600 hover:underline">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default SignUp
