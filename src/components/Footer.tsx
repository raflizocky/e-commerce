function Footer() {
    const year = new Date().getFullYear()

    return (
        <footer className="bg-white border-t border-gray-100 mt-16">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-sm text-gray-500">

                    {/* Left: Brand & Copyright */}
                    <div className="text-center md:text-left">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-amber-600 font-bold text-lg">E-Commerce</span>
                            <span className="w-1 h-1 bg-amber-600 rounded-full"></span>
                        </div>
                        <p className="text-gray-400">© {year} All rights reserved</p>
                    </div>

                    {/* Middle: Divider (optional visual separator) */}
                    <div className="hidden md:block h-px w-16 bg-gray-200"></div>

                    {/* Right: Developer Credit + GitHub */}
                    <div className="flex flex-col items-center md:items-end text-center md:text-right">
                        <p className="text-gray-500">
                            Crafted with care by
                            <a
                                href="https://raflizocky.netlify.app"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ml-1 text-amber-600 hover:text-amber-700 font-medium underline underline-offset-2 transition"
                                aria-label="Visit Rafli Zocky's portfolio"
                            >
                                Rafli Zocky Leonard
                            </a>
                        </p>
                        <p className="mt-1 text-gray-400">
                            <a
                                href="https://github.com/raflizocky/e-commerce/tree/fe-react"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-amber-600 transition"
                                aria-label="View source code on GitHub"
                            >
                                View on GitHub →
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer