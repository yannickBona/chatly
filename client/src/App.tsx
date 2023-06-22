import "./Globals.css";
import {
  BrowserRouter,
  Route,
  Routes,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Error404 from "./pages/Error/Error404";
import Home from "./pages/Home/Home";
import Post from "./components/Post/Post";
import { PostProvider } from "./contexts/PostContext";
import { PostListProvider } from "./contexts/PostListContext";
import PostPage from "./pages/PostPage/PostPage";
import Login from "./pages/Login/Login";
import { AuthContextProvider } from "./contexts/AuthContext";
import RequireAuth from "./components/RequireAuth/RequireAuth";

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <PostListProvider>
          <BrowserRouter>
            <Routes>
              {/* Auhtorized Routes */}
              <Route element={<RequireAuth />}>
                <Route path="/" element={<Home />} />

                <Route
                  path="/post/:id"
                  element={
                    <PostProvider>
                      <PostPage />
                    </PostProvider>
                  }
                />
              </Route>

              {/* Public Routes */}
              <Route path="/login" element={<Login />} />

              {/* Catch Routes */}
              <Route path="*" element={<Error404 />} />
              <Route path="/unauthorized" element={<div>Unauthorized!</div>} />
            </Routes>
          </BrowserRouter>
        </PostListProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
