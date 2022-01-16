import React from "react";
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { deactivatePost } from "../service/PostService.js";

const ListDetails = (props) => {
    const [itemsToDel, setItemsToDel] = useState([]);
    const [message, setMessage] = useState("");
    const [showStatusModal, setStatusModal] = useState(false);
    const [disableDelete, setDisableDelete] = useState(false);

    const markItems = (postId) => {
        if (!itemsToDel.find((item) => item == postId))
            setItemsToDel([...itemsToDel, postId]);
        else
            setItemsToDel(itemsToDel.filter((item) => item !== postId));
    };

    const clearState = () => {
        props.handleClose();
    };
    
    const deleteItems = () => {
        setDisableDelete(true);
        itemsToDel.forEach((postId) => {
            deactivatePost(postId);
            props.handleClose();
            setStatusModal(true);
            setMessage("Success! Selected posts were deleted.")
        });
    };

    const resetState = () => {
        setItemsToDel([]);
        setDisableDelete(false);
    };

    return (
        <div>
            <Modal
                show={props.show}
                onHide={props.handleClose}
                onExit={() => resetState()}
            >
                <ModalHeader>
                    <ModalTitle>Items</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    {
                        <ol className="list-group list-group-numbered">
                            {props.items.map((item) => {
                                return (
                                    <li
                                        className="list-group-item d-flex justify-content-between align-items-start"
                                        key={item.postId}
                                    >
                                        {!props.isReadOnly && (
                                            <input
                                                className="form-check-input me-1"
                                                onClick={() => markItems(item.postId)}
                                                type="checkbox"
                                                value=""
                                                aria-label="..."
                                            />
                                        )}
                                        <div className="ms-2 me-auto">
                                            <div className="fw-bold">{item.urlDescription}</div>
                                            <a href={item.url} target="_blank" rel="noopener noreferrer">{item.url}</a> <br />
                                        </div>
                                        <span className="badge bg-primary rounded-pill">
                                            {item.likes} Likes
                                        </span>
                                    </li>
                                );
                            })}
                        </ol>
                    }
                </ModalBody>
                <ModalFooter>
                    <Button onClick={props.handleClose}>Close</Button>
                    {!props.isReadOnly && (
                        <Button disabled={disableDelete} onClick={() => deleteItems()} className="btn btn-danger">
                            {disableDelete && <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" />}
                            Delete
                        </Button>
                    )}
                </ModalFooter>
            </Modal>
            <Modal centered size="sm" backdrop="true" show={showStatusModal} onExit={() => setStatusModal(false)} onHide={clearState}>
                <ModalBody>
                    {message}
                </ModalBody>
                <ModalFooter>
                    <Button onClick={() => { props.handleClose(); setStatusModal(false); }} className="btn-sm btn-primary" > Close </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default ListDetails;
