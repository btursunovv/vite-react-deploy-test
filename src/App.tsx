import { useEffect, useState } from "react";
import "./App.css";
import { IPost } from "./types";
import { Post } from "./Post";

function App() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<IPost | null>(null);

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
        {selectedPost ? (
          <Post post={selectedPost} onBackPress={() => setSelectedPost(null)} />
        ) : (
          <>
            {posts.map((post) => (
              <div className="posts-item">
                <p key={post.id}>{post.title}</p>
                <button onClick={() => setSelectedPost(post)}>View Post</button>
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
