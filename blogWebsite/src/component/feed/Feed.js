import React from "react";
import Post from "../post/Post";
import Sidebar from "../sidebar/Sidebar";
import "./Feed.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router";

function Feed() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("http://localhost:5000/api/posts" + search);
      setPosts(res.data);
    };
    fetchPosts();
  }, [search]);
  return (
    <div className="feeds">
      <div className="feed">
        {posts.map((p,i) => (
          <Post key={i} post={p} />
        ))}
      </div>
      <Sidebar />
    </div>
  );
}

export default Feed;
