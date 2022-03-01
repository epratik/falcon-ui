import React from "react";
import { useState, useEffect } from "react";
import CreateList from "./CreateList.js";
import ListCard from "./ListCard.js";
import { Button, Tab, Tabs, TabContainer} from "react-bootstrap";
import { getTokenAttributes } from "../service/TokenService";
import { getAvatar } from "../service/AvatarService.js";
import TopContent from "./TopContent.js";
import { getLists } from "../service/ListService.js";
import About from "./About.js";

const Profile = () => {
  const [lists, setLists] = useState([]);
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [componentName, setCompName] = useState('top-content');

  const setTopContent = () => {
    setCompName('top-content')
  }

  const setMyList = () => {
    setCompName('my-list')
  }

  const setAbout = () => {
    setCompName('about')
  }

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
            {/* <img
              src={getAvatar(name)}
              alt={name}
              className="me-3 rounded-circle"
              style={{ width: "100px", height: "100px" }}
            /> */}
            <div>
              <h5 className="fw-bold">Welcome! {name}</h5>
              <CreateList show={show} handleClose={handleClose}>
                {" "}
              </CreateList>
              <Button className="btn btn-primary ms-2 mt-1"  onClick={handleShow}>
                {" "}
                post-link{" "}
              </Button>
              <Button className="btn btn-primary ms-2 mt-1"  onClick={setTopContent}>
                {" "}
                top-content{" "}
              </Button>
              <Button className="btn btn-primary ms-2 mt-1"  onClick={setMyList}>
                {" "}
                my-list{" "}
              </Button>
              <Button className="btn btn-primary ms-2 mt-1"  onClick={setAbout}>
                {" "}
                about{" "}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className=" mb-3 mt-4" >
        {(componentName == 'top-content') && <TopContent></TopContent>}
        {(componentName == 'my-list') &&
          <div class="list-group">
            {
              lists.map((list) => {
                return (
                  <ListCard list={list}></ListCard>
                )
              })
            }
          </div>
        }
         {(componentName == 'about') && <About></About>}
      </div>
    </div>
  );
};

export default Profile;
