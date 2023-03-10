import "./Globals.css";
import Postlist from "./components/Postlist";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error404 from "./pages/Error404";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Postlist />,
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
