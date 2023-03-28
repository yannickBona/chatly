import "./Globals.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error404 from "./pages/Error/Error404";
import Home from "./pages/Home/Home";
import Post from "./components/Post/Post";
import { PostProvider } from "./contexts/PostContext";
import { PostListProvider } from "./contexts/PostListContext";
import PostPage from "./pages/PostPage/PostPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PostListProvider>
        <Home />
      </PostListProvider>
    ),
    errorElement: <Error404 />,
  },
  {
    path: "/post/:id",
    element: (
      <PostProvider>
        <PostPage />
      </PostProvider>
    ),
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
