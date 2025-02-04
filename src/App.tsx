// src/App.tsx
import React from "react";
import PostList from "./components/PostList";

const App: React.FC = () => {
  return (
    <div className="App bg-gray-100 min-h-screen py-10">
      <h1 className="text-center text-4xl font-bold mb-6">Blog Posts</h1>
      <PostList />
    </div>
  );
};

export default App;
