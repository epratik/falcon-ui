import React from "react";
import { useState, useEffect } from "react";
import CreateList from "./CreateList.js";
import ListCards from "./ListCards.js";
import { Button, Tab, Tabs } from "react-bootstrap";
import InfiniteScroll from 'react-infinite-scroll-component';
import Post from './Post'
import page1 from '../data.json'
import page2 from '../page2.json'
import mylists from '../data/mylists.json'
import tags from '../data/tags.json'
import profilepic from '../images/profilepic.png'
import { getPosts } from "../service/PostService.js";

const Profile = () => {
  const [show, setShow] = useState(false);
  const [offset, setOffset] = useState(0);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [topPosts, setTopPosts] = useState({ content: [] });
  const [tag, setTag] = useState('');
  
  const onTagChange = (newTag) => {
    setTag(newTag);
    setOffset(0);
  };

  useEffect(() => {
    //get data from axios
    //use second argument [] to hold variables on whose change the hook should run again.
    getPosts(offset, tag).then(res => {
      if (res && res.content) {
        console.log(res.content)
        setTopPosts(res);
        setOffset(res.content.length)
      }
    });
  }, [tag]);

  return (
    <div  style={{ width:'50rem'}}>
      <div className="header">
      <div className="card sticky-top mt-2" style={{ width: "50rem" }}>
        <div className="d-flex">
          <img
            src={profilepic}
            alt="Pratik Pednekar"
            className="me-3 rounded-circle"
            style={{ width: "100px", height: "100px" }}
          />
          <div>
            <h5 className="fw-bold">Pratik Pednekar</h5>
            <CreateList show={show} handleClose={handleClose}>
              {" "}
            </CreateList>
            <Button className="btn btn-primary" onClick={handleShow}>
              {" "}
              Post A Link{" "}
            </Button>
          </div>
        </div>
      </div>
      </div>
      <Tabs
        defaultActiveKey="topContent"
        id="uncontrolled-tab-example"
        className="mb-3 mt-2 sticky-top"
        style={{ backgroundColor: "#FFFFFF", width:"50rem"}}
      >
        <Tab eventKey="topContent" title="Top Content" style={{ width: "50rem" }}>
        <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
          {
            tags.tags.map(item => {
              return <button key={ Math.random().toString(36).substr(2, 9) } type="button" onClick={()=>onTagChange(item)} className="btn btn-light  btn-outline-primary ms-1 mt-1">#{item}</button>
            })
          }
          </div>
          <div key="77">
          <InfiniteScroll
            dataLength={topPosts.content.length}
            next={() => {
              getPosts(offset, tag).then(res => {
                topPosts.content = topPosts.content.concat(res.content);
                setTopPosts(topPosts);
                setOffset(topPosts.content.length)
              });
             
            }}
            hasMore={true}
            loader={<h4>Loading...</h4>}
          >
            {topPosts && topPosts.content.map((item) => {
              return <Post item={item} key={item.post.postId}> </Post>;
            })}
          </InfiniteScroll>
          </div>
        </Tab>
        <Tab eventKey="followedContent" title="Followed Content" style={{ width: "50rem" }}>

        </Tab>
        <Tab eventKey="myList" title="My Lists" style={{ width: "50rem" }}>
          <ListCards items={mylists}>

          </ListCards>
        </Tab>
      </Tabs>
    </div>
  );
};

export default Profile;
