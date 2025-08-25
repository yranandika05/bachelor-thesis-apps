import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../supabase/client.js";
import CommentSection from "../components/CommentSection.jsx";
import StaffPicks from "../components/StaffPicks.jsx";
import GridPosts from "../components/GridPosts.jsx";
import {loadFromCache, saveToCache} from "../utils/cache.js";

export default function PostDetail() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [otherPosts, setOtherPosts] = useState([]);

    useEffect(() => {
        const fetchPostAndOthers = async () => {
            const postCacheKey = `post-detail-${id}`;
            const listCacheKey = "homepage-posts";

            // Try load from cache
            const cachedPost = loadFromCache(postCacheKey);
            const cachedList = loadFromCache(listCacheKey);

            if (cachedPost) {
                setPost(cachedPost);
            }

            if (cachedList) {
                setOtherPosts(cachedList.filter(p => p.id !== id));
            }

            // Only fetch post if not cached
            if (!cachedPost) {
                const { data: postData, error: postError } = await supabase
                    .from("posts")
                    .select("*")
                    .eq("id", id)
                    .single();

                if (!postError && postData) {
                    setPost(postData);
                    saveToCache(postCacheKey, postData, 5 * 60 * 1000); // 5 min TTL
                }
            }

            // Only fetch list if not cached
            if (!cachedList) {
                const { data: othersData, error: othersError } = await supabase
                    .from("posts")
                    .select("id, title, category, status, thumbnail")
                    .in("status", ["FEATURED", "HIGHLIGHTED", "STAFF_PICK"])
                    .order("created_at", { ascending: false });

                if (!othersError && othersData) {
                    saveToCache(listCacheKey, othersData, 5 * 60 * 1000);
                    setOtherPosts(othersData.filter(p => p.id !== id));
                }
            }

        };

        fetchPostAndOthers();
    }, [id]);


    const highlighted = otherPosts.filter((p) => p.status === "HIGHLIGHTED");

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
            {highlighted.length > 0 && (
                <div className="mt-16">
                <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
                    <GridPosts posts={highlighted.slice(0, 4)} />
                </div>
            )}
        </div>
    );
}
