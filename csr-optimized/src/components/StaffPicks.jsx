import { Link } from "react-router-dom";
import {pages} from "../App.jsx";

export default function StaffPicks({ posts }) {
    if (!posts || posts.length === 0) return null;

    return (
        <aside className="space-y-4 text-left ml-0 lg:ml-8">
            {/* Header */}
            <div className="flex items-center text-xl sm:text-2xl gap-3 sm:gap-4">
                <i className="fa-regular fa-thumbs-up text-primary" />
                <h3 className="font-semibold">Staff Picks</h3>
            </div>

            {/* List */}
            <ul className="space-y-2">
                {posts.map((item) => (
                    <li
                        key={item.id}
                        className="py-1 sm:py-3 px-4 sm:px-6 hover:bg-gray-100 rounded-md transition duration-300"
                    >
                        <Link
                            to={`/post/${item.id}`}
                            onMouseEnter={() => pages["/post/:id"].preload()}
                        >
                            <p className="text-sm sm:text-base text-primary font-medium">{item.category}</p>
                            <h2 className="text-gray-700 sm:text-xl font-semibold">
                                {item.title}
                            </h2>
                        </Link>
                    </li>
                ))}
            </ul>
        </aside>
    );
}
