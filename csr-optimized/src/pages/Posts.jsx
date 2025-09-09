import { useEffect, useState } from "react";
import { supabase } from "../supabase/client";
import PostCard from "../components/PostCard.jsx";
import StaffPicks from "../components/StaffPicks.jsx";
import GridPosts from "../components/GridPosts.jsx";

export default function Posts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {

            const { data, error } = await supabase
                .from("posts")
                .select("id, title, category, status, thumbnail")
                .in("status", ["FEATURED", "HIGHLIGHTED", "STAFF_PICK"])
                .order("created_at", { ascending: false });

            if (!error) {
                setPosts(data);
            }

        };

        fetchPosts();
    }, []);


    const heroPost = posts.find((p) => p.status === "FEATURED");
    const gridPosts = posts.filter((p) => p.status === "HIGHLIGHTED");
    const staffPicks = posts.filter((p) => p.status === "STAFF_PICK");

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in-up">
            {/* Hero + Sidebar */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
                {heroPost && (
                    <PostCard
                        post={heroPost}
                        variant="hero"
                        className="md:col-span-2"
                    />
                )}

                <StaffPicks posts={staffPicks} />
            </div>

            <GridPosts posts={gridPosts} />
        </div>
    );
}
