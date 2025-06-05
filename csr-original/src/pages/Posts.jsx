import {useEffect, useState} from "react";
import {supabase} from "../supabase/client";

export default function Posts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            const {data, error} = await supabase.from('posts').select('*').order('created_at', { ascending: false })
            if (error) {
                console.error('Error fetching posts:', error)
            }else {
                setPosts(data)
            }
            setLoading(false)
        }

        fetchPosts()
    }, [])

    if (loading) return <p>Loading ...</p>

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">All Posts</h1>
            {posts.map((post) => (
                <div
                    key={post.id}
                    className="mb-8 pb-6 border-b border-gray-300"
                >
                    <img
                        src={post.thumbnail}
                        alt="Thumbnail"
                        className="w-full h-auto mb-4 rounded-md shadow-sm"
                    />
                    <h2 className="text-2xl font-semibold mb-1">{post.title}</h2>
                    <p className="text-gray-600 italic">{post.excerpt}</p>
                </div>
            ))}
        </div>
    );

}