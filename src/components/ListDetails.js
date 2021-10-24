import React from 'react'
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";
import { Button } from "react-bootstrap";

const ListDetails = (props) => {
    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <ModalHeader>
                <ModalTitle>Items</ModalTitle>
            </ModalHeader>
            <ModalBody>
                {props.items.map(item => {
                    return (
                        <ol class="list-group list-group-numbered">
                            <li class="list-group-item d-flex justify-content-between align-items-start">
                                <input class="form-check-input me-1" type="checkbox" value="" aria-label="..." />
                                <div class="ms-2 me-auto">
                                    <div class="fw-bold">{ item.description }</div>
                                    <a href={ item.link }>{ item.link }</a> <br />
                                </div>
                                <span class="badge bg-primary rounded-pill">14 Likes</span>
                            </li>
                        </ol>
                    )
                })}
            </ModalBody>
            <ModalFooter>
                <Button onClick={props.handleClose}>Close</Button>
                <Button className="btn btn-danger">Delete</Button>
            </ModalFooter>
        </Modal>
    )
}


export default ListDetails
