import { createSupabaseServerClient } from "@/lib/supabaseServerClient";
import PostCard from "@/components/PostCard";
import StaffPicks from "@/components/StaffPicks";
import GridPosts from "@/components/GridPosts";

async function fetchPosts() {
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

export default async function HomePage() {
    const posts = await fetchPosts();

    const heroPost = posts.find((p) => p.status === "FEATURED");
    const gridPosts = posts.filter((p) => p.status === "HIGHLIGHTED");
    const staffPicks = posts.filter((p) => p.status === "STAFF_PICK");

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in-up">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
                {heroPost && (
                    <PostCard post={heroPost} variant="hero" className="md:col-span-2" />
                )}
                <StaffPicks posts={staffPicks} />
            </div>
            <GridPosts posts={gridPosts} />
        </div>
    );
}
