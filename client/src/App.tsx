import "./Globals.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Error404 from "./pages/Error/Error404";
import Home from "./pages/Home/Home";
import { SinglePostProvider } from "./contexts/SinglePostContext";
import PostPage from "./pages/PostPage/PostPage";
import Login from "./pages/Login/Login";
import { AuthContextProvider } from "./contexts/AuthContext";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import Explore from "./pages/Explore/Explore";
import Profile from "./pages/Profile/Profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserList from "./pages/UsersList/UserList";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthContextProvider>
          <Routes>
            {/* Auhtorized Routes */}
            <Route element={<RequireAuth />}>
              <Route index errorElement={<Error404 />} element={<Home />} />

              <Route path="/post/:id" element={<PostPage />} />
              <Route path="/profile/:username" element={<Profile />} />
              <Route path="/explore" element={<Explore />} />
              <Route
                path="/profile/:username/followed"
                element={<UserList section="followed" />}
              />
              <Route
                path="/profile/:username/followers"
                element={<UserList section="followers" />}
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
      <ToastContainer />
    </div>
  );
}

export default App;
