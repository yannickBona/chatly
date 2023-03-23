import "./Globals.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error404 from "./pages/Error/Error404";
import Home from "./pages/Home/Home";
import Post from "./components/Post/Post";
import { PostProvider } from "./contexts/PostContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error404 />,
  },
  {
    path: "/post/:id",
    element: (
      <PostProvider>
        <Post />
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
