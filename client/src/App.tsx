import "./Globals.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Error404 from "./pages/Error/Error404";
import Home from "./pages/Home/Home";
import Post from "./components/Post/Post";
import { PostProvider } from "./contexts/PostContext";
import { PostListProvider } from "./contexts/PostListContext";
import PostPage from "./pages/PostPage/PostPage";
import Login from "./pages/Login/Login";
import { AuthContextProvider } from "./contexts/AuthContext";
import RequireAuth from "./components/RequireAuth/RequireAuth";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthContextProvider>
        <PostListProvider>
          <h1>Chatly</h1>
          <RequireAuth />
        </PostListProvider>
      </AuthContextProvider>
    ),
    errorElement: <Error404 />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/post/:id",
        element: (
          <PostProvider>
            <PostPage />
          </PostProvider>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: (
      <AuthContextProvider>
        <Login />
      </AuthContextProvider>
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
