import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="w-full py-4 px-2 bg-white">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 hover:opacity-80">
                    <img
                        src="/Logo2.png"
                        alt="MyBlog Logo"
                        className="w-52 h-auto object-contain"
                    />
                </Link>

                {/* Navigation Links */}
                <div className="flex gap-6 items-center text-sm font-medium text-gray-700">
                    <Link to="/posts">
                        <p className="text-gray-700 hover:text-primary hover:border-b hover:border-b-primary transition">All Posts</p>
                    </Link>
                    <Link to="/write" className="hover:text-blue-600 transition">
                        <p className="text-white bg-primary rounded-md px-2 py-2 hover:shadow-lg transition">
                            Write a Blog
                        </p>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
