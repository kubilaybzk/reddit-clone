import { useQuery } from "@apollo/client";
import React from "react";
import { GET_ALL_POSTS } from "../graphql/queries";
import Post from "./Post";

export default function Feed() {
  const { data, error } = useQuery(GET_ALL_POSTS);
  const posts = data?.getPostList;
  return (
    <div className="w-full">
      {posts?.map((post) => (
        <div className="mt-5 w-full">
          <Post key={post.id} post={post} />
        </div>
      ))}
    </div>
  );
}
