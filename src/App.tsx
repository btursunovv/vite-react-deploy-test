import { useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";
import { IPost } from "./types";
import { Post } from "./Post";
import { useComments } from "./hooks";

function App() {
  const [count, setCount] = useState(1);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const counterComments = useComments(count);

  const selectedPost = useMemo(() => {
    const post = posts.find((item) => item.id === selectedId);

    return post ? { ...post, title: post.title.toUpperCase() } : null;
  }, [selectedId, posts]);

  const onBackPress = useCallback(() => setSelectedId(null), []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `https://jsonplaceholder.typicode.com/posts`;

        const response = await fetch(url);
        const data = await response.json();

        setPosts(data);
      } catch {}
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>Comments count: {JSON.stringify(counterComments)}</p>
        {selectedPost ? (
          <Post post={selectedPost} onBackPress={onBackPress} />
        ) : (
          <>
            {posts.map((post) => (
              <div key={post.id} className="posts-item">
                <p>{post.title}</p>
                <button onClick={() => setSelectedId(post.id)}>
                  View Post
                </button>
              </div>
            ))}
          </>
        )}
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
