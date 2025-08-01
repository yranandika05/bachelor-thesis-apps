export default function CommentSection({ postId, comments }) {

    return (
        <div className="mt-10">
            <h3 className="text-xl font-semibold mb-4">Comments</h3>

            {/* Form native */}
            <form
                method="POST"
                action="/api/comment"
                className="space-y-4 mb-8"
            >
                <input
                    type="hidden"
                    name="post_id"
                    value={postId}
                />
                <input
                    type="text"
                    name="name"
                    placeholder="Your name (optional)"
                    className="w-full px-3 py-2 border rounded shadow-sm"
                />
                <textarea
                    name="content"
                    required
                    placeholder="Write a comment..."
                    className="w-full px-3 py-2 border rounded shadow-sm min-h-[100px]"
                />
                <button
                    type="submit"
                    className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
                >
                    Post Comment
                </button>
            </form>

            {/* List Comments */}
            {comments.length === 0 ? (
                <p className="text-gray-400 italic">No comments yet.</p>
            ) : (
                <ul className="space-y-4">
                    {comments.map((comment) => (
                        <li key={comment.id} className="bg-gray-100 p-4 rounded shadow-sm">
                            <p className="font-semibold text-gray-700">{comment.name || "Anonymous"}</p>
                            <p className="text-gray-600">{comment.content}</p>
                            <p className="text-xs text-gray-400 mt-2">
                                {new Date(comment.created_at).toLocaleString()}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
