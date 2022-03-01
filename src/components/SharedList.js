import React from "react";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "./Post";
import { getSharedListPosts } from "../service/PostService.js";

const SharedList = (props) => {
    const [offset, setOffset] = useState(0);
    const [topPosts, setTopPosts] = useState({ content: [] });
    const [userId, setUserId] = useState(0);
    const [fetchingContent, setFetchingContent] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    

    const getListItems = (offset, concat) => {
        let search = window.location.search;
        let params = new URLSearchParams(search);

        getSharedListPosts(params.get('listId'), offset).then((res) => {
            if (res && res.content) {
                topPosts.content = concat ? topPosts.content.concat(res.content) : res.content;
                setTopPosts(topPosts);
                setOffset(topPosts.content.length);
                setFetchingContent(false);
                if (res.content.length > 0)
                    setHasMore(true);
                else
                    setHasMore(false);
            }
        });
    }

    useEffect(() => {
        setFetchingContent(true);
        getListItems(offset, false);
    }, []);


    return (
        <div>
            <div key="77">
                <InfiniteScroll
                    dataLength={topPosts.content.length}
                    next={() => {
                        getListItems(offset, true);
                    }}
                    hasMore={hasMore}
                    loader={<h5>Loading...</h5>}
                    endMessage={<h6>No more items in this list.</h6>}
                >
                    {topPosts &&
                        topPosts.content.map((item, index) => {
                            return (
                                <Post blockFollowLike={true} userId={userId} adId={index} item={item} key={item.post.postId}>
                                    {" "}
                                </Post>
                            );
                        })
                    }
                </InfiniteScroll>
            </div>
        </div>
    );
};

export default SharedList;
