import { FC, memo, useEffect } from "react";
import { IPost } from "../types";
import { useComments } from "../hooks";
import styles from "./Post.module.css";

interface Props {
  post: IPost;
  onBackPress?: () => void;
}

export const Post: FC<Props> = memo((props) => {
  const { post, onBackPress } = props;

  const comments = useComments(post.id);

  useEffect(() => {
    return () => {
      console.log("component did unmount");
    };
  }, []);

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      {comments.length > 0 ? (
        <>
          <h3>Comments:</h3>
          {comments.map((comment) => (
            <div key={comment.id} className={styles.comment}>
              <p>
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
});
