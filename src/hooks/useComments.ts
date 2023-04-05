import { useState, useEffect } from "react";
import { IComment } from "../types";

export const useComments = (postId: number) => {
  const [comments, setComments] = useState<IComment[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `https://jsonplaceholder.typicode.com/posts/${postId}/comments`;

        const response = await fetch(url);
        const data = await response.json();

        setComments(data);
      } catch {}
    };

    fetchData();
  }, [postId]);

  return comments;
};
