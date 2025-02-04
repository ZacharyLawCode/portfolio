// src/components/PostList.tsx
import React from "react";
import { usePosts } from "../controllers/PostController";

const PostList: React.FC = () => {
  const { posts, loading, error } = usePosts();

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto mt-8">
      {posts.map((post) => (
        <div key={post.id} className="p-4 mb-4 border rounded-lg shadow-md hover:shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800">{post.title}</h2>
          <p className="text-gray-600">{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default PostList;
