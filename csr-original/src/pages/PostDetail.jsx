import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {supabase} from "../supabase/client.js";
import CommentSection from "../components/CommentSection.jsx";

export default function PostDetail() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            const { data, error } = await supabase
                .from("posts")
                .select("*")
                .eq("id", id)
                .single()

            if (error) {
                console.error("Error fetching post", error);
            }else {
                setPost(data);
            };
            setLoading(false);
        }

        fetchPost();
    }, [id])

    if (loading) return <p className="text-center mt-10 text-gray-500">Loading...</p>;
    if(!post) return <p className="text-center mt-10 text-red-500">Post not found</p>;

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <img
                src={post.thumbnail}
                alt="Thumbnail"
                className="w-full h-auto rounded-md mb-6"
            />
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
            <p className="text-gray-700 whitespace-pre-line">{post.content}</p>

            <CommentSection postId={post.id} />
        </div>
    )
}