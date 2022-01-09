import React from "react";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "./Post";
import { getPosts } from "../service/PostService.js";
import tags from "../data/tags.json";

const TopContent = () => {
  const [offset, setOffset] = useState(0);
  const [isBackBtnDisabled, setBackButtonDisabler] = useState(true);
  const [topPosts, setTopPosts] = useState({ content: [] });
  const [tag, setTag] = useState("");
  const [subTag, setSubTag] = useState("");

  const onBackClick = () => {
    setSubTag("");
    setTag("");
    setBackButtonDisabler(true);
  }

  const onTagChange = (newTag) => {
    setTag(newTag);
    setOffset(0);
    //Set sub tags to empty if this tag has no sub tags which means we get content from server using only the tag name.
    if (tags[newTag])
      setBackButtonDisabler(false);
    else
      setSubTag(null);

  };

  const onSubTagChange = (newSubTag) => {
    setSubTag(newSubTag);
    setOffset(0);
  };

  const getTopContent = (offset, tag) => {
    getPosts(offset, tag).then((res) => {
      if (res && res.content) {
        topPosts.content = topPosts.content.concat(res.content);
        setTopPosts(res);
        setOffset(res.content.length);
      }
    });
  }

  useEffect(() => {
    //get data from axios
    //use second argument [] to hold variables on whose change the hook should run again.
    console.log('triggering getTopContent from useeffect');
    getTopContent(offset, tag, subTag);
  }, [subTag]);

  return (
    <div>
      <div
        className="btn-toolbar"
        role="toolbar"
        aria-label="Toolbar with button groups"
      >
        {
          tag == "" || !tags[tag] ?
            tags.tags.map((item) => {
              return (
                <button
                  key={Math.random().toString(36).substr(2, 9)}
                  type="button"
                  onClick={() => onTagChange(item)}
                  className="btn btn-light  btn-outline-primary ms-1 mt-1"
                >
                  #{item}
                </button>
              );
            })
            :
            tags[tag].map((item) => {
              return (
                <button
                  key={Math.random().toString(36).substr(2, 9)}
                  type="button"
                  onClick={() => onSubTagChange(item)}
                  className="btn btn-light  btn-outline-primary ms-1 mt-1"
                >
                  #{item}
                </button>
              );
            })
        }
        <button type="button" disabled={isBackBtnDisabled} onClick={()=> onBackClick()} className="btn btn-dark ms-1 mt-1"> back </button>
        </div>
      <div key="77">
        <InfiniteScroll
          dataLength={topPosts.content.length}
          next={() => {
            getTopContent(offset, tag);
          }}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          {topPosts &&
            topPosts.content.map((item) => {
              return (
                <Post item={item} key={item.post.postId}>
                  {" "}
                </Post>
              );
            })}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default TopContent;
