import React from "react";
import { useState, useEffect } from "react";
import CreateList from "./CreateList.js";
import ListCard from "./ListCard.js";
import { Button, Tab, Tabs } from "react-bootstrap";
import { getTokenAttributes } from "../service/TokenService";
import { getAvatar } from "../service/AvatarService.js";
import TopContent from "./TopContent.js";
import { getLists } from "../service/ListService.js";

const Profile = () => {
  const [lists, setLists] = useState([]);
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getTokenAttributes().then((att) => {
      const lastName = att.family_name ? att.family_name : "";
      setName(att.name + " " + lastName);
    });
  }, []);

  useEffect(() => {
    getLists().then(res => {
      if (res && res.length > 0) {
        setLists(res);
      }
    })
  }, []);

  return (
    <div>
      <div className="header">
        <div className="card border-0 sticky-top mt-2">
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
        mountOnEnter="true"
      >
        <Tab eventKey="topContent" title="Top Content">
          <TopContent></TopContent>
        </Tab>
        {/* <Tab eventKey="followedContent" title="Followed Content">
          <FollowedContent></FollowedContent>
        </Tab> */}
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
        <Tab eventKey="About" title="About"> 
        <div className="col-md-6">
          <div className="h-100 p-5 border rounded-3 text-dark bg-light" >
            <h2>Contact Us</h2>
              <p> <i>Hope you liked our site, reach out to us at conten.help@gmail.com</i></p>
              <p>
                <i>
                  <a href="https://www.freeprivacypolicy.com/live/48fa369a-8192-4407-9ff4-c4de5b902b68" target="_blank" rel="noopener noreferrer" >Click here to view the privacy policy.</a>
                </i>
              </p>
          </div>
        </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default Profile;
