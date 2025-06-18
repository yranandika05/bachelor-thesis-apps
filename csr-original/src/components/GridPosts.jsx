import PostCard from "./PostCard";

export default function GridPosts({ posts }) {
    if (!posts || posts.length === 0) return null;

    return (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {posts.map((post, index) => (
                <div key={post.id} className={`animate-fade-in-up animation-delay-${index * 100}`}>
                    <PostCard post={post}/>
                </div>
            ))}
        </div>
    );
}