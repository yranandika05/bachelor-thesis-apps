"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function CommentSection({ postId, initialComments }) {
    const [comments, setComments] = useState(initialComments);
    const [name, setName] = useState("");
    const [content, setContent] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        const { error } = await supabase.from("comments").insert([
            {
                post_id: postId,
                name: name.trim() || "Anonymous",
                content: content.trim(),
                source_app: "ssr-original",
            },
        ]);

        if (!error) {
            setComments([
                ...comments,
                {
                    id: Date.now(), // temporary ID untuk instant update
                    name: name.trim() || "Anonymous",
                    content: content.trim(),
                    created_at: new Date().toISOString(),
                },
            ]);
            setName("");
            setContent("");
        } else {
            console.error("Error submitting comment:", error);
        }

        setSubmitting(false);
    };

    return (
        <div className="mt-10">
            <h3 className="text-xl font-semibold mb-4">Comments</h3>

            {/* Form */}
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
                    className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
                >
                    {submitting ? "Posting..." : "Post Comment"}
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
