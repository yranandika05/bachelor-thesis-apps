import { useEffect, useState } from "react"
import { supabase } from "../supabase/client"

export default function CommentSection({ postId }) {
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(true)
    const [name, setName] = useState("")
    const [content, setContent] = useState("")
    const [submitting, setSubmitting] = useState(false)

    const sourceApp = "csr-original"

    useEffect(() => {
        fetchComments()
    }, [postId])

    const fetchComments = async () => {
        setLoading(true)
        const { data, error } = await supabase
            .from("comments")
            .select("*")
            .eq("post_id", postId)
            .order("created_at", { ascending: true })

        if (!error) setComments(data)
        else console.error("Error fetching comments:", error)

        setLoading(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!content.trim()) return

        setSubmitting(true)

        const { error } = await supabase.from("comments").insert([
            {
                post_id: postId,
                name: name.trim() || "Anonymous",
                content: content.trim(),
                source_app: sourceApp,
            },
        ])

        if (error) {
            console.error("Error submitting comment:", error)
        } else {
            setName("")
            setContent("")
            fetchComments()
        }

        setSubmitting(false)
    }

    return (
        <div className="mt-10">
            <h3 className="text-xl font-semibold mb-4">Comments</h3>

            <form onSubmit={handleSubmit} className="space-y-4 mb-8">
                <input
                    type="text"
                    placeholder="Your name (optional)"
                    className="w-full px-3 py-2 border rounded shadow-sm"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <textarea
                    required
                    placeholder="Write a comment..."
                    className="w-full px-3 py-2 border rounded shadow-sm min-h-[100px]"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <button
                    type="submit"
                    disabled={submitting}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    {submitting ? "Posting..." : "Post Comment"}
                </button>
            </form>

            {loading && <p className="text-gray-500">Loading comments...</p>}
            {!loading && comments.length === 0 && (
                <p className="text-gray-400 italic">No comments yet.</p>
            )}
            <ul className="space-y-4">
                {comments.map((comment) => (
                    <li key={comment.id} className="bg-gray-100 p-4 rounded shadow-sm">
                        <p className="font-medium text-gray-700">{comment.name || "Anonymous"}</p>
                        <p className="text-gray-600">{comment.content}</p>
                        <p className="text-xs text-gray-400 mt-2">
                            {new Date(comment.created_at).toLocaleString()}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    )
}
