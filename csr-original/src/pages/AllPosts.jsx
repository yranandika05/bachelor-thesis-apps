import { useEffect, useState } from "react";
import { supabase } from "../supabase/client";
import PostCard from "../components/PostCard";

export default function AllPosts() {
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchAllPosts = async () => {
            const { data, error } = await supabase
                .from("posts")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) {
                console.error("Error fetching posts:", error);
            } else {
                setPosts(data);
            }
        };

        fetchAllPosts();
    }, []);

    const filtered = posts.filter(
        (post) =>
            post.title.toLowerCase().includes(search.toLowerCase()) ||
            post.category?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6 text-center">All Posts</h1>

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
            {filtered.length === 0 ? (
                <p className="text-center text-gray-500 py-8">No matching posts found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>
            )}
        </div>
    );
}
