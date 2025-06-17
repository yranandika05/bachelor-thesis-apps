import './App.css'
import Posts from "./pages/Posts.jsx";
import {Route, Routes} from "react-router-dom";
import PostDetail from "./pages/PostDetail.jsx";
import AllPosts from "./pages/AllPosts.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {
  return (
      <>
          <Navbar />
          <main className="max-w-7xl mx-auto w-full px-4 py-4 min-h-[100dvh]">
              <Routes>
                  <Route path="/" element={<Posts/>}/>
                  <Route path="/post/:id" element={<PostDetail/>}/>
                  <Route path="/posts" element={<AllPosts/>}/>
                  <Route path="*" element={<div className="p-4 text-red-500">404: Not Found</div>}/>
              </Routes>
          </main>
      </>
  )
}

export default App
