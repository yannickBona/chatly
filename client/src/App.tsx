import { useEffect, useState } from "react";
import "./Globals.css";
import axios from "axios";
import { IPost } from "./types";

function App() {
  const [posts, setPosts] = useState<IPost[]>([]);

  /**
   * Fetch all the posts
   */
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_BASE_URL || "http://127.0.0.1:3000"
        );

        if (response.status !== 200) {
          throw new Error(`Invalid response: ${response.statusText}`);
        }

        return setPosts(response.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <div className="App">
      {posts.map((post: IPost) => (
        <div key={post._id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
