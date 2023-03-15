import "./Globals.css";
import Postlist from "./components/Postlist/Postlist";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error404 from "./pages/Error/Error404";
import Home from "./pages/Home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error404 />,
  },
  {
    path: "/post/:id",
    element: <h1>Inside post</h1>,
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
