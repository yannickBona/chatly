import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { getPosts } from "../api/Posts/getPosts";
import { IPost } from "../types";
import { IAuthContext, IMainContext, ModalTypes } from "./types";
import { deletePost } from "../api/Posts/deletePost";
import { AuthContext } from "./AuthContext";

export const MainContext = createContext<any>({});

export function MainContextProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<IPost[] | undefined>();
  const [openModal, setOpenModal] = useState<ModalTypes | null>(null);
  const [selectedPost, setSelectedPost] = useState<IPost | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { setUser } = useContext<IAuthContext>(AuthContext);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const response = await getPosts();
      if (response.status !== 200) return setError(response.details as string);

      setPosts(response.data.posts);
    } catch (err) {
      setError(err as string);
    } finally {
      setLoading(false);
    }
  };

  const handlePostDelete = async (id: string) => {
    // e.preventDefault();
    const response = await deletePost(id);
    if (response.status !== 200) return;

    setUser((prevUser) => {
      if (!prevUser) return null;
      return { ...prevUser, postsUploaded: prevUser?.postsUploaded - 1 };
    });

    const newPosts = posts?.filter(
      (post) => post._id !== response.data.post._id
    );
    setPosts(newPosts);
  };

  const data: IMainContext = {
    postList: posts,
    setPosts,
    openModal,
    setOpenModal,
    selectedPost,
    setSelectedPost,
    handlePostDelete,
  };

  return (
    <MainContext.Provider value={data}>
      {loading ? <h1>Loading</h1> : error ? <h1>error</h1> : children}
    </MainContext.Provider>
  );
}
