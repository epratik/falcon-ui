import React from 'react'
import ListDetails from './ListDetails';
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { getLists } from "../service/ListService.js";
import { getPostsForAList } from "../service/PostService.js";

const ListCard = (props) => {
    const [show, setShow] = useState(false);
    const [items, setItems] = useState([])
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const getPosts = (listId) => {
        getPostsForAList(listId).then(res => {
            setItems(res);
        })
    }

    const onClickShowLists = (listId) => {
        handleShow();
        getPosts(listId);
    }

    return (
        <div>
            <section class="col-lg-3 ms-2" key={props.list.listId}>
                <div className="card bg-light mb-3" style={{ "maxWidth": "18rem" }}>
                    <div className="card-header">{props.list.name}</div>
                    <div className="card-body">
                        <ListDetails items={items} isReadOnly={false} show={show} handleClose={handleClose} />
                        <h5 className="card-title">{props.list.views} Views</h5>
                        <p className="card-text">{props.list.description}</p>
                        <Button className="btn btn-secondary" onClick={()=>onClickShowLists(props.list.listId)}>Show List</Button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ListCard
