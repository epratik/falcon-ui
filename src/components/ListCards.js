import React from 'react'
import ListDetails from './ListDetails';
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { getLists } from "../service/ListService.js";
import listItems from '../data/items.json'
import mylists from '../data/mylists.json'

const ListCards = (props) => {
    const [show, setShow] = useState(false);
    const [lists, setLists] = useState([]);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        getLists().then(res => {
            if (res && res.length > 0) {
                console.log(res)
                setLists(res);
            }
        })
    }, [])

    return (
        <div className="row">{
            lists.map((list) => {
                return (
                    <section class="col-lg-3 ms-2" key={list.listId}>
                        <div className="card bg-light mb-3" style={{ "maxWidth": "18rem" }}>
                            <div className="card-header">{list.name}</div>
                            <div className="card-body">
                                <ListDetails items={listItems} isReadOnly={false} show={show} handleClose={handleClose} />
                                <h5 className="card-title">{list.views} Views</h5>
                                <p className="card-text">{list.description}</p>
                                <Button className="btn btn-secondary" onClick={handleShow}>Show List</Button>
                            </div>
                        </div>
                    </section>
                )
            })
        }
        </div>
       
    )
}

export default ListCards
