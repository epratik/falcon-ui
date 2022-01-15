import React from "react";
import { useState, useEffect } from "react";
import CreateList from "./CreateList.js";
import ListCard from "./ListCard.js";
import { Button, Tab, Tabs } from "react-bootstrap";
import { getTokenAttributes } from "../service/TokenService";
import { getAvatar } from "../service/AvatarService.js";
import TopContent from "./TopContent.js";
import FollowedContent from "./FollowedContent.js";
import { getLists } from "../service/ListService.js";

const Profile = () => {
  const [lists, setLists] = useState([]);
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getTokenAttributes().then((att) => {
      setName(att.name);
    });
  }, []);

  useEffect(() => {
    console.log('list effect called')
    getLists().then(res => {
      if (res && res.length > 0) {
        setLists(res);
      }
    })
  }, []);

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
        <Tab eventKey="followedContent" title="Followed Content">
          <FollowedContent></FollowedContent>
        </Tab>
        <Tab eventKey="myList" title="My Lists">
          <div className="row">
            {
              lists.map((list) => {
                return (
                  <ListCard list={list}></ListCard>
                )
              })
            }
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default Profile;
