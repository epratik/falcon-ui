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

const Profile = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    //get data from axios
    //use second argument [] to hold variables on whose change the hook should run again.
    setData(page1);
  }, []);

  return (
    <div>
      <div class="header">
      <div class="card sticky-top" style={{ width: "40rem" }}>
        <div class="d-flex">
          <img
            src="https://mdbootstrap.com/img/new/avatars/2.jpg"
            alt="Pratik Pednekar"
            class="me-3 rounded-circle"
            style={{ width: "100px", height: "100px" }}
          />
          <div>
            <h5 class="fw-bold">Pratik Pednekar</h5>
            <CreateList show={show} handleClose={handleClose}>
              {" "}
            </CreateList>
            <Button class="btn btn-primary" onClick={handleShow}>
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
        className="mb-3 sticky-top"
        style={{ backgroundColor: "#FFFFFF"}}
      >
        <Tab eventKey="topContent" title="Top Content">
        <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
          {
            tags.tags.map(item => {
              return <button type="button" class="btn btn-light  btn-outline-primary ms-1 mt-1">#{item}</button>
            })
          }
          </div>
          <InfiniteScroll
            dataLength={data.length}
            next={() => {
              setData(page1.concat(page2));
            }}
            hasMore={true}
            loader={<h4>Loading...</h4>}
          >
            {data.map((item) => {
              return <Post item={item}> </Post>;
            })}
          </InfiniteScroll>
        </Tab>
        <Tab eventKey="myList" title="My Lists">
          <ListCards items={mylists}>

          </ListCards>
        </Tab>
        <Tab eventKey="search" title="Search"></Tab>
      </Tabs>
    </div>
  );
};

export default Profile;
