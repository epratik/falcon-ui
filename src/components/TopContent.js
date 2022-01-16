import React from "react";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "./Post";
import { getPosts } from "../service/PostService.js";
import tags from "../data/tags.json";
import { getUserId } from "../service/TokenService";

const TopContent = () => {
  const [offset, setOffset] = useState(0);
  const [isBackBtnDisabled, setBackButtonDisabler] = useState(true);
  const [topPosts, setTopPosts] = useState({ content: [] });
  const [tag, setTag] = useState("top-content");
  const [subTag, setSubTag] = useState("");
  const [userId, setUserId] = useState(0);
  const [subTagAvailable, setSubTagAvailable] = useState(false);
  const [fetchingContent, setFetchingContent] = useState(true);

  const onBackClick = () => {
    setBackButtonDisabler(true);
  }

  const onTagChange = (newTag) => {
    setTag(newTag);
    setOffset(0);
    //Set sub tags to empty if this tag has no sub tags which means we get content from server using only the tag name.
    if (tags[newTag]) {
      setBackButtonDisabler(false);
      setSubTag("");
      setSubTagAvailable(true);
    }
    else {
      console.log('setting empty sub tag to true')
      setSubTagAvailable(false);
    }
  };

  const onSubTagChange = (newSubTag) => {
    setSubTag(newSubTag);
    setOffset(0);
  };

  const getTopContent = (offset, tag, subTag, concat) => {
    getPosts(offset, tag, subTag).then((res) => {
      if (res && res.content) {
        topPosts.content = concat ? topPosts.content.concat(res.content) : res.content;
        setTopPosts(topPosts);
        setOffset(topPosts.content.length);
        setFetchingContent(false);
      }
    });
  }

  useEffect(() => {

    if ((tag != "" && !subTagAvailable) || (tag != "" && subTag != "")) {
      setFetchingContent(true);
      getTopContent(offset, tag, subTag, false);
    }
  }, [subTag, subTagAvailable, tag]);

  useEffect(() => {
    getUserId().then((val) => {
      setUserId(val);
    });
  }, []);

  return (
    <div>
      <div
        className="btn-toolbar"
        role="toolbar"
        aria-label="Toolbar with button groups"
      >
        {
          isBackBtnDisabled ?
            tags.tags.map((item) => {
              return (
                <button
                  key={Math.random().toString(36).substr(2, 9)}
                  type="button"
                  onClick={() => onTagChange(item)}
                  className="btn btn-light  btn-outline-primary ms-1 mt-1"
                >
                {tag == item && fetchingContent && <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" />}
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
                {subTag == item && fetchingContent && <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" />}
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
            getTopContent(offset, tag, subTag, true);
          }}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          {topPosts &&
            topPosts.content.map((item) => {
              return (
                <Post userId={userId} item={item} key={item.post.postId}>
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
