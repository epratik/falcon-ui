import React from "react";
import { useState, useEffect } from "react";
import CreateList from "./CreateList.js";
import ListCards from "./ListCards.js";
import { Button, Tab, Tabs } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "./Post";
import page1 from "../data.json";
import page2 from "../page2.json";
import mylists from "../data/mylists.json";
import tags from "../data/tags.json";
import profilepic from "../images/profilepic.png";
import { getPosts } from "../service/PostService.js";
import { getTokenAttributes } from "../service/TokenService";
import { getAvatar } from "../service/AvatarService.js";
import TopContent from "./TopContent.js";

const Profile = () => {
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);
  const [offset, setOffset] = useState(0);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [topPosts, setTopPosts] = useState({ content: [] });
  const [tag, setTag] = useState("");
  const [tabKey, setTabKey] = useState("topContent");

  const onTagChange = (newTag) => {
    setTag(newTag);
    setOffset(0);
  };

  useEffect(() => {
    getTokenAttributes().then((att) => {
      setName(att.name);
    });
  }, []);

  useEffect(() => {
    //get data from axios
    //use second argument [] to hold variables on whose change the hook should run again.
    getPosts(offset, tag).then((res) => {
      if (res && res.content) {
        setTopPosts(res);
        setOffset(res.content.length);
      }
    });
  }, [tag]);

  return (
    <div>
      <div className="header">
        <div className="card sticky-top mt-2">
          <div className="d-flex">
            <img
              src={getAvatar(name)}
              alt={name}
              className="me-3 rounded-circle"
              style={{ width: "100px", height: "100px" }}
            />
            <div>
              <h5 className="fw-bold">{name}</h5>
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
        style={{ backgroundColor: "#FFFFFF" }}
      >
        <Tab eventKey="topContent" title="Top Content">
          <TopContent></TopContent>
        </Tab>
        <Tab eventKey="followedContent" title="Followed Content"></Tab>
        <Tab eventKey="myList" title="My Lists" onSelect>
          <ListCards></ListCards>
        </Tab>
      </Tabs>
    </div>
  );
};

export default Profile;
