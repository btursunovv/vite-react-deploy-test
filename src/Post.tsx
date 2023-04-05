import { FC, useEffect, useState } from "react";
import { IComment, IPost } from "./types";

interface Props {
  post: IPost;
  onBackPress: () => void;
}

export const Post: FC<Props> = (props) => {
  const { post, onBackPress } = props;

  const [comments, setComments] = useState<IComment[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `https://jsonplaceholder.typicode.com/posts/${post.id}/comments`;

        const response = await fetch(url);
        const data = await response.json();

        setComments(data);
      } catch {}
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      {comments.length > 0 ? (
        <>
          <h3>Comments:</h3>
          {comments.map((comment) => (
            <div className="posts-item">
              <p key={comment.id}>
                {comment.name} ({comment.email})
              </p>
              <p>{comment.body}</p>
            </div>
          ))}
        </>
      ) : null}
      <button onClick={onBackPress}>Go back</button>
    </div>
  );
};
