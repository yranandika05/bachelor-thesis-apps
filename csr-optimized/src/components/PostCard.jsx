import { Link } from "react-router-dom";
import {pages} from "../App.jsx";

export default function PostCard({ post, variant = "grid", className = "" }) {
    const isHero = variant === "hero";
    const imgRatioClass = isHero
        ? "aspect-[5/3] md:aspect-[4/2]"
        : "aspect-[6/3]";

    return (
        <Link
            to={`/post/${post.id}`}
            onMouseEnter={() => pages["/post/:id"].preload()}
            className={className}
        >
            <div className={`relative`}>
                {/* Card Container with Overflow Hidden */}
                <div className="relative h-full w-full rounded-lg shadow-lg flex flex-col overflow-hidden group">
                    {/* Base Content */}
                    <div className="flex flex-col transition-opacity duration-300 group-hover:opacity-50">
                        {/* Image */}
                        <div className="w-full">
                            <img
                                src={post.thumbnail}
                                alt={post.title}
                                className={`w-full ${imgRatioClass} object-cover`}
                                loading="lazy"
                            />
                        </div>
                        {/* Text */}
                        <div className="p-4 text-left">
                            <p className="text-gray-400 text-sm font-semibold">{post.category}</p>
                            <h2
                                className={`${
                                    isHero ? "text-2xl font-bold mt-2" : "text-sm md:text-md font-semibold mt-1"
                                } text-gray-700 mb-2`}
                            >
                                {post.title}
                            </h2>
                        </div>
                    </div>

                    {/* Hover Preview */}
                    <div
                        className={`absolute inset-0 z-20 opacity-0 translate-x-full group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out pointer-events-auto`}
                    >
                        {/* Background Image */}
                        <div className="absolute inset-0">
                            <img
                                src={post.thumbnail}
                                alt={post.title}
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black/60" />
                        </div>

                        {/* Content on top of image */}
                        <div className="relative z-10 flex flex-col h-full p-6 text-white">
                            <h2 className="text-xl font-bold mb-3">{post.title}</h2>
                            <p className="text-sm line-clamp-5 flex-grow">{post.content}</p>
                            <div className="mt-4 text-right">
                                <p
                                    className="text-white text-sm font-medium underline underline-offset-4 hover:text-neutral-200"
                                >
                                    Read more →
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
