import React from "react";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "./Post";
import { getFollowedPosts } from "../service/PostService.js";

const FollowedContent = () => {
    const [offset, setOffset] = useState(0);
    const [followedPosts, setFollowedPosts] = useState({ content: [] });

    const getFollowedContent = (offset) => {
        getFollowedPosts(offset).then((res) => {
          if (res && res.content) {
            followedPosts.content = followedPosts.content.concat(res.content);
            setFollowedPosts(followedPosts);
            setOffset(followedPosts.content.length);
          }
        });
      }

    useEffect(() => {
        getFollowedContent(offset);
    }, []);
    
    
    return (
        <div key="78">
        <InfiniteScroll
          dataLength={followedPosts.content.length}
          next={() => {
            getFollowedContent(offset);
          }}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          {followedPosts &&
            followedPosts.content.map((item) => {
              return (
                <Post item={item} key={item.post.postId}>
                  {" "}
                </Post>
              );
            })}
        </InfiniteScroll>
      </div>
    )
}

export default FollowedContent