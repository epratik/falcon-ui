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
            <div>
                <div class="card bg-light mb-3" style={{ "max-width": "18rem" }}>
                    <div class="card-header">{list.name}</div>
                    <div class="card-body">
                        <ListDetails items={listItems} show={show} handleClose={handleClose} />
                        <h5 class="card-title">{list.views} Views</h5>
                        <p class="card-text">{list.description}</p>
                        <Button class="btn btn-secondary" onClick={handleShow}>Show List</Button>
                    </div>
                </div>
                </div>
            )
        })
       
    )
}

export default ListCards
