import { Link } from "react-router-dom";

export default function StaffPicks({ posts }) {
    if (!posts || posts.length === 0) return null;

    return (
        <aside className="space-y-4 text-left ml-8">
            <div className="flex items-center text-2xl gap-4">
                <i className="fa-regular fa-thumbs-up text-primary" />
                <h3 className="font-semibold">Staff Picks</h3>
            </div>
            <ul className="space-y-2">
                {posts.map((item) => (
                    <li
                        key={item.id}
                        className="py-4 px-6 hover:bg-gray-100 hover:rounded-md transition duration-500"
                    >
                        <Link to={`/post/${item.id}`}>
                            <p className="text-primary font-semibold">{item.category}</p>
                            <h2 className="text-gray-700 text-xl font-bold">{item.title}</h2>
                        </Link>
                    </li>
                ))}
            </ul>
        </aside>
    );
}
