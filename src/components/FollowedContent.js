import React from "react";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "./Post";
import { getFollowedPosts } from "../service/PostService.js";

const FollowedContent = () => {
    const [offset, setOffset] = useState(0);
  const [followedPosts, setFollowedPosts] = useState({ content: [] });
  const [hasMore, setHasMore] = useState(true);

    const getFollowedContent = (offset) => {
        getFollowedPosts(offset).then((res) => {
          if (res && res.content) {
            followedPosts.content = followedPosts.content.concat(res.content);
            setFollowedPosts(followedPosts);
            setOffset(followedPosts.content.length);
            if (res.content.length > 0)
              setHasMore(true);
            else
              setHasMore(false);
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
          hasMore={hasMore}
          loader={<h5>Loading...</h5>}
          endMessage={<h6> Oops, no content found. Follow more users to get content here. </h6>}
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