import React, { useCallback, useState } from "react";

const PostsContext = React.createContext({});

export default PostsContext;

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  const [noMorePosts, setNoMorePosts] = useState(false);
  // This function is called when first 5 posts are loaded into app layout, postsFromSSR thus represents latest 5 posts
  const setPostsFromSSR = useCallback((postsFromSSR = []) => {
    console.log("POSTS FROM SSR:", postsFromSSR);
    // This logic ensures I don't reload the first 5 posts only every time AppLayout is re-rendered, reloads the first 5 posts in addition to what is already there instead
    setPosts((value) => {
      const newPosts = [...value];
      postsFromSSR.forEach((post) => {
        const exists = newPosts.find((p) => p._id === post._id);
        if (!exists) {
          newPosts.push(post);
        }
      });

      // Ensure that it is sorted correctly, this is for the case where a new post is generated, it will be retrieved as one of the "latest 5 posts" and thus be put at the end of the array when it should be at the front
      newPosts.sort((a, b) => b.created - a.created);
      return newPosts;
    });
  }, []);

  const getPosts = useCallback(
    async ({ lastPostDate, getNewerPosts = false }) => {
      const result = await fetch(`/api/getPosts`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ lastPostDate, getNewerPosts }),
      });
      const json = await result.json();
      const postsResult = json.posts || [];
      if (postsResult.length < 6 && !getNewerPosts) {
        setNoMorePosts(true);
      }
      console.log("POSTS RESULTS: ", postsResult);
      setPosts((value) => {
        if (!getNewerPosts && postsResult.length == 6) {
          postsResult.pop();
        }
        const newPosts = [...value];
        postsResult.forEach((post) => {
          const exists = newPosts.find((p) => p._id === post._id);
          if (!exists) {
            newPosts.push(post);
          }
        });
        return newPosts;
      });
    },
    []
  );
  return (
    <PostsContext.Provider
      value={{ posts, setPostsFromSSR, getPosts, noMorePosts }}
    >
      {children}
    </PostsContext.Provider>
  );
};
