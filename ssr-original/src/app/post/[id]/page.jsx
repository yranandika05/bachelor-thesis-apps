import Image from "next/image";
import { createSupabaseServerClient } from "@/lib/supabaseServerClient";
import GridPosts from "@/components/GridPosts";
import CommentSection from "@/components/CommentSection";

async function fetchPostsAndComments(id) {
    const supabase = createSupabaseServerClient();

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

    //Fetch comments
    const { data: commentsData, error: commentsError } = await supabase
        .from("comments")
        .select("*")
        .eq("post_id", id)
        .order("created_at", { ascending: true });

    if (postError || othersError || commentsError) {
        console.error("Error fetching data:", postError || othersError || commentsError);
        return { post: null, others: [] };
    }

    return { post: postData, others: othersData, comments:commentsData };
}

export default async function PostDetail({ params }) {
    const { id } = params;
    const { post, others, comments } = await fetchPostsAndComments(id);

    if (!post) {
        return <p className="text-center mt-10 text-red-500">Post not found</p>;
    }

    return (
        <div className="max-w-5xl mx-auto px-4 py-10">
            {/* Thumbnail */}
            <div className="w-full mb-6">
                <Image
                    src={post.thumbnail}
                    alt={post.title}
                    width={1200}
                    height={600}
                    className="rounded-md object-cover w-full"
                />
            </div>

            {/* Title */}
            <h2 className="text-3xl lg:text-5xl font-semibold mb-2 md:mb-6">{post.title}</h2>
            <p className="text-lg text-primary font-semibold mb-8">{post.category}</p>

            {/* Content */}
            <div className="text-gray-700 space-y-6 mb-12">
                {post.content
                    .split("\\n")
                    .map((paragraph, index) => (
                        <p key={index} className="font-content whitespace-pre-line leading-relaxed tracking-wide">
                            {paragraph}
                        </p>
                    ))}
            </div>

            {/* Comment Section (client component) */}
            <CommentSection postId={post.id} comments={comments} />

            {/* Highlighted Posts */}
            {others.length > 0 && (
                <div className="mt-16">
                    <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
                    <GridPosts posts={others.slice(0, 4)} />
                </div>
            )}
        </div>
    );
}
