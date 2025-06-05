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
        <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
            <h1>All Posts</h1>
            {posts.map(post => (
                <div key={post.id} style={{ marginBottom: '2rem', borderBottom: '1px solid #ccc', paddingBottom: '1rem' }}>
                    <img src={post.thumbnail} alt="Thumbnail" style={{ width: '100%', height: 'auto', marginBottom: '1rem' }} />
                    <h2>{post.title}</h2>
                    <p><em>{post.excerpt}</em></p>
                </div>
            ))}
        </div>
    )
}