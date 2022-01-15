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
                {
                    <ol className="list-group list-group-numbered">
                        {
                            props.items.map(item => {
                                return (
                                    <li className="list-group-item d-flex justify-content-between align-items-start" key={item.postId}>
                                        {!props.isReadOnly &&
                                            <input className="form-check-input me-1" type="checkbox" value="" aria-label="..." />}
                                        <div className="ms-2 me-auto">
                                            <div className="fw-bold">{item.urlDescription}</div>
                                            <a href={item.url}>{item.url}</a> <br />
                                        </div>
                                        <span className="badge bg-primary rounded-pill">{item.likes} Likes</span>
                                    </li>
                                )
                            })
                        }
                    </ol>
                }
            </ModalBody>
            <ModalFooter>
                <Button onClick={props.handleClose}>Close</Button>
                {!props.isReadOnly && <Button className="btn btn-danger">Delete</Button>}
            </ModalFooter>
        </Modal>
    )
}


export default ListDetails
