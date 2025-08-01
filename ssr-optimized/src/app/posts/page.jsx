import SearchClient from "@/components/SearchClient";
import { createSupabaseServerClient } from "@/lib/supabaseServerClient";

async function fetchAllPosts() {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching posts:", error);
        return [];
    }
    return data;
}

export default async function AllPostsPage() {
    const posts = await fetchAllPosts();

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6 text-center">All Posts</h1>
            <SearchClient initialPosts={posts} />
        </div>
    );
}
