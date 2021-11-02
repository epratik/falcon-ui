import React from 'react'
import ListDetails from './ListDetails';
import { useState } from "react";
import { Button } from "react-bootstrap";
import listItems from '../data/items.json'

const ListCards = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        props.items.map((list) => {
            return(
            <div key={list.id}>
                <div className="card bg-light mb-3" style={{ "maxWidth": "18rem" }}>
                    <div className="card-header">{list.name}</div>
                    <div className="card-body">
                        <ListDetails items={listItems} show={show} handleClose={handleClose} />
                        <h5 className="card-title">{list.views} Views</h5>
                        <p className="card-text">{list.description}</p>
                        <Button className="btn btn-secondary" onClick={handleShow}>Show List</Button>
                    </div>
                </div>
                </div>
            )
        })
       
    )
}

export default ListCards
