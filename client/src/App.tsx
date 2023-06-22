import "./Globals.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Error404 from "./pages/Error/Error404";
import Home from "./pages/Home/Home";
import { PostProvider } from "./contexts/PostContext";
import PostPage from "./pages/PostPage/PostPage";
import Login from "./pages/Login/Login";
import { AuthContextProvider } from "./contexts/AuthContext";
import RequireAuth from "./components/RequireAuth/RequireAuth";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthContextProvider>
          <Routes>
            {/* Auhtorized Routes */}
            <Route element={<RequireAuth />}>
              <Route index errorElement={<Error404 />} element={<Home />} />

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
        </AuthContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
