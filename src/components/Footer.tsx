function Footer() {
    const year = new Date().getFullYear()

    return (
        <footer className="bg-gray-100 border-gray-300 mt-10">
            <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-600">

                {/* Left */}
                <div className="mb-4 md:mb-0">
                    Developed by
                    <a
                        href="https://raflizocky.netlify.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-amber-600 hover:underline ml-1 underline"
                    >
                        RAFLI ZOCKY LEONARD
                    </a>
                </div>

                {/* Middle */}
                <div className="text-center mb-4 md:mb-0">
                    <div className="text-xl font-bold text-amber-600">E-Commerce</div>
                    <div className="text-gray-500">© {year}</div>
                </div>

                {/* Right */}
                <div>
                    Fork this project
                    <a
                        href="https://github.com/raflizocky/e-commerce/tree/fe-react"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-amber-600 hover:underline ml-1 underline"
                    >
                        HERE
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer
