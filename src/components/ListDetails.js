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
        if (itemsToDel.length > 0) {
            setDisableDelete(true);
            itemsToDel.forEach((postId) => {
                deactivatePost(postId).then(() => {
                    props.handleClose();
                    setStatusModal(true);
                    setMessage("Success! Selected posts were deleted.")
                }).catch(() => {
                    props.handleClose();
                    setStatusModal(true);
                    setMessage("Error! Please try again later.")
                })
            });
        } else {
            setMessage("Please select a post to delete");
            props.handleClose();
            setStatusModal(true);
        }
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
                                            <div>
                                                <input
                                                    className="form-check-input"
                                                    onClick={() => markItems(item.postId)}
                                                    type="checkbox"
                                                    value=""
                                                    aria-label="..."
                                                />
                                            </div>
                                        )}
                                        <div className="ms-2 me-auto">
                                            <div className="ms-2 fw-bold text-wrap text-break">{item.urlDescription}</div>
                                            <a className="ms-2" href={item.url} target="_blank" rel="noopener noreferrer">{item.url.substring(0,20)}...</a> <br />
                                        </div>
                                        <span className="ms-2 badge bg-primary rounded-pill">
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
