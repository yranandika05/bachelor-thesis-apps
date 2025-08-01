import { createSupabaseServerClient } from "@/lib/supabaseServerClient";
import PostCard from "@/components/PostCard";

export default async function AllPostsPage({ searchParams }) {
    const search = await searchParams?.q?.toLowerCase() || "";

    const supabase = createSupabaseServerClient();
    const { data: posts, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching posts:", error);
        return <p className="text-red-500 text-center py-8">Failed to load posts.</p>;
    }

    const filtered = posts.filter(
        (post) =>
            post.title.toLowerCase().includes(search) ||
            post.category?.toLowerCase().includes(search)
    );

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6 text-center">All Posts</h1>

            {/* Native Search Form */}
            <form className="mb-8 flex justify-center" method="GET">
                <input
                    type="text"
                    name="q"
                    defaultValue={searchParams?.q || ""}
                    placeholder="Search by title or category..."
                    className="w-full sm:max-w-sm px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="ml-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Search
                </button>
            </form>

            {/* Conditional Rendering */}
            {posts.length === 0 ? (
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
        </div>
    );
}
