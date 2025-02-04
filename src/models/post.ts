// src/models/post.ts
export type Post = {
    id: number;
    title: string;
    content: string;
  };
  
  export const fetchPosts = async (): Promise<Post[]> => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    return await response.json();
  };
  