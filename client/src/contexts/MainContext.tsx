import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getPosts } from "../services/api/Posts/getPosts";
import { $ResponseData, IComment, IPost } from "../types";
import { IMainContext, ModalTypes } from "./types";
import { deletePost } from "../services/api/Posts/deletePost";
import { useAuthContext } from "./AuthContext";
import { deleteComment } from "../services/api/Comments/deleteComment";
import { useSinglePostContext } from "./SinglePostContext";
import Loader from "../components/Loader";

export const MainContext = createContext<IMainContext | null>(null);

export const useMainContext = () => {
  const mainContext = useContext(MainContext);

  if (!mainContext)
    throw new Error(
      "useMainContext has to be used within <MainContextProvider />"
    );

  return mainContext;
};

export function MainContextProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<IPost[] | undefined>();
  const [openModal, setOpenModal] = useState<ModalTypes | null>(null);
  const [selectedPost, setSelectedPost] = useState<IPost | null>(null);
  const [selectedComment, setSelectedComment] = useState<IComment | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { setCurrentPost } = useSinglePostContext();
  const { setUser } = useAuthContext();

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

    // Decrease users posts number
    setUser((prevUser) => {
      if (!prevUser) return null;
      return { ...prevUser, postsUploaded: prevUser?.postsUploaded - 1 };
    });

    const newPosts = posts?.filter(
      (post) => post._id !== response.data.post._id
    );
    setPosts(newPosts);
  };

  /**
   * Deletes a comment given its ID
   * @param id commentId
   * @returns
   */
  const handleCommentDelete = async (id: string) => {
    if (!id) return;

    const response: $ResponseData = await deleteComment(id);
    if (response.status !== 200) return;

    setCurrentPost((prevPost) =>
      prevPost
        ? {
            ...prevPost,
            comments: prevPost.comments.filter(
              (comment) => response.data.comment._id !== comment._id
            ),
          }
        : null
    );
  };

  const data: IMainContext = useMemo(
    () => ({
      postList: posts,
      selectedComment,
      selectedPost,
      openModal,
      setPosts,
      setOpenModal,
      setSelectedPost,
      handlePostDelete,
      handleCommentDelete,
      setSelectedComment,
    }),
    [openModal, posts, selectedPost, selectedComment]
  );

  return (
    <MainContext.Provider value={data}>
      {loading && <Loader />}
      {error ? <h1>error</h1> : children}
    </MainContext.Provider>
  );
}
