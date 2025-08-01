import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
    return (
        <nav className="w-full py-4 px-2 bg-white">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 hover:opacity-80">
                    <Image
                        src="/Logo2.png"
                        alt="MyBlog Logo"
                        width={200}
                        height={50}
                        className="object-contain"
                        priority
                    />
                </Link>

                {/* Navigation Links */}
                <div className="flex gap-6 items-center text-sm font-medium text-gray-700">
                    <Link href="/posts" className="hover:text-blue-600 transition">
                        <div className="text-white bg-primary rounded-md px-4 py-2 hover:shadow-lg transition">
                            See All Posts
                        </div>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
