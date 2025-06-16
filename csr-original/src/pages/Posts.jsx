import { useEffect, useState } from "react";
import { supabase } from "../supabase/client";
import { Link } from "react-router-dom";
import PostCard from "../components/PostCard.jsx";

export default function Posts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            const { data, error } = await supabase
                .from("posts")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) {
                console.error("Error fetching posts:", error);
            } else {
                setPosts(data);
            }

            setLoading(false);
        };

        fetchPosts();
    }, []);

    if (loading) return <p className="text-center mt-10 text-gray-500">Loading ...</p>;

    const heroPost = posts.find((p) => p.status === "FEATURED");
    const gridPosts = posts.filter((p) => p.status === "HIGHLIGHTED");
    const staffPicks = posts.filter((p) => p.status === "STAFF_PICK");

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Hero + Sidebar */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
                {heroPost && (
                    <PostCard
                        post={heroPost}
                        variant="hero"
                        className="md:col-span-2"
                    />
                )}

                {/* Sidebar: Staff Picks */}
                <aside className="space-y-4">
                    <h3 className="text-xl font-semibold">Staff Picks</h3>
                    <ul className="space-y-2 text-sm text-blue-700">
                        {staffPicks.map((item) => (
                            <li key={item.id}>
                                <Link to={`/post/${item.id}`} className="hover:underline">
                                    {item.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </aside>
            </div>

            {/* Grid Posts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {gridPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
}
