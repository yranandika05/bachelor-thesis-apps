import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../supabase/client.js";
import CommentSection from "../components/CommentSection.jsx";
import StaffPicks from "../components/StaffPicks.jsx";
import GridPosts from "../components/GridPosts.jsx";

export default function PostDetail() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [otherPosts, setOtherPosts] = useState([]);

    useEffect(() => {
        const fetchPostAndOthers = async () => {
            // Fetch post detail
            const { data: postData, error: postError } = await supabase
                .from("posts")
                .select("*")
                .eq("id", id)
                .single();

            // Fetch other posts
            const { data: othersData, error: othersError } = await supabase
                .from("posts")
                .select("*")
                .neq("id", id)
                .in("status", ["HIGHLIGHTED"])
                .order("created_at", { ascending: false });

            if (postError || othersError) {
                console.error("Error fetching data:", postError || othersError);
            } else {
                setPost(postData);
                setOtherPosts(othersData);
            }

        };

        fetchPostAndOthers();
    }, [id]);

    return (
        <div className="max-w-5xl mx-auto px-4 py-10">
            {/* Thumbnail */}
            <img
                src={post.thumbnail}
                alt={post.title}
                className="w-full h-auto rounded-md mb-6"
            />

            {/* Title */}
            <h2 className="text-3xl lg:text-5xl font-semibold md:font-bold mb-2  md:mb-6">{post.title}</h2>
            <p className="text-lg text-primary font-semibold">{post.category}</p>

            {/* Content */}
            <div className="text-gray-700 space-y-6 my-8 md:my-12">
                {post.content
                    .split("\\n")
                    .map((paragraph, index) => (
                        <p key={index} className="font-content whitespace-pre-line leading-relaxed tracking-wide">
                            {paragraph}
                        </p>
                    ))}
            </div>

            {/* Comment Section */}
            <CommentSection postId={post.id}/>

            {/* Highlighted Posts */}
            {otherPosts.length > 0 && (
                <div className="mt-16">
                <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
                    <GridPosts posts={otherPosts.slice(0, 4)} />
                </div>
            )}
        </div>
    );
}
