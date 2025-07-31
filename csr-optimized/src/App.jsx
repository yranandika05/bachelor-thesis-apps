import './App.css'
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import EnvironmentBadge from "./components/EnvirontmentBadge.jsx";
import {ElementLoader} from "./utils/ElementLoader.jsx";

// Lazy imports
const Posts = lazy(() => import("./pages/Posts.jsx"));
const PostDetail = lazy(() => import("./pages/PostDetail.jsx"));
const AllPosts = lazy(() => import("./pages/AllPosts.jsx"));

export const pages = {
    "/": {
        Component: Posts,
        preload: () => import("./pages/Posts.jsx"),
    },
    "/posts": {
        Component: AllPosts,
        preload: () => import("./pages/AllPosts.jsx"),
    },
    "/post/:id": {
        Component: PostDetail,
        preload: () => import("./pages/PostDetail.jsx"),
    }
};

function App() {
    return (
        <>
            <Navbar onLinkHover={(path) => pages[path]?.preload?.()} />
            <EnvironmentBadge mode="CSR - Optimized" />
            <main className="max-w-7xl mx-auto w-full px-4 py-4 min-h-[100dvh]">
                <Suspense fallback={<p className="text-center">Loading...</p>}>
                    <Routes>
                        <Route path="/" element={ElementLoader(pages["/"].Component)} />
                        <Route path="/posts" element={ElementLoader(pages["/posts"].Component)} />
                        <Route path="/post/:id" element={ElementLoader(pages["/post/:id"].Component)} />
                        <Route
                            path="*"
                            element={<div className="p-4 text-red-500">404: Not Found</div>}
                        />
                    </Routes>
                </Suspense>
            </main>
        </>
    );
}


export default App
