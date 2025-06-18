"use client";

import { useState } from "react";
import PostCard from "./PostCard";

export default function SearchClient({ initialPosts }) {
    const [search, setSearch] = useState("");

    const filtered = initialPosts.filter(
        (post) =>
            post.title.toLowerCase().includes(search.toLowerCase()) ||
            post.category?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            {/* Search Bar */}
            <div className="mb-8 flex justify-center">
                <input
                    type="text"
                    placeholder="Search by title or category..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full sm:max-w-sm px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Conditional rendering */}
            {initialPosts.length === 0 ? (
                <p className="text-center text-gray-500 py-8">No posts available.</p>
            ) : filtered.length === 0 ? (
                <p className="text-center text-gray-500 py-8">No matching posts found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>
            )}
        </>
    );
}
