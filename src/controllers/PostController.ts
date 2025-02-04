// src/controllers/PostController.ts
import { useEffect, useState } from "react";
import { fetchPosts, Post } from "../models/post";

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchPosts();
        setPosts(data);
      } catch (err) {
        setError("Failed to load posts.");
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, []);

  return { posts, loading, error };
};
