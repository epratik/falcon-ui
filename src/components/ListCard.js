import React from "react";
import ListDetails from "./ListDetails";
import { useState, useEffect } from "react";
import { getPostsForAList } from "../service/PostService.js";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";

const ListCard = (props) => {
    const [show, setShow] = useState(false);
    const [statusModal, setStatusModal] = useState(false);
    const [message, setMessage] = useState("");
    const [items, setItems] = useState([]);
    const [spinner, setSpinner] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getPosts = (listId) => {
        getPostsForAList(listId).then((res) => {
            setSpinner(false);
            setItems(res);
            if (res.length > 0)
                handleShow();
            else {
                setMessage("This list is empty. To add items, use post a link feature.")
                setStatusModal(true);
            }
        });
    };

    const onClickShowLists = (listId) => {
        setSpinner(true);
        getPosts(listId);
    };

    return (
        <div>
            <button onClick={() => onClickShowLists(props.list.listId)} type="button" class="list-group-item list-group-item-action">{props.list.name}
            <span class="position-absolute top-0 end-0 me-1 mt-2  badge bg-danger ">
            {props.list.views} views
  </span>
                {/* <span data-bs-toggle="tooltip" data-bs-placement="top" title="No of views"
                    class="badge bg-danger position-absolute top-0 end-0"> {props.list.views}</span> */}
                {spinner && (
                    <span
                        class="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                    />
                )}
            </button>
            <ListDetails
                items={items}
                isReadOnly={false}
                show={show}
                handleClose={handleClose}
                listId ={props.list.listId}
            />
            <Modal
                centered
                size="sm"
                show={statusModal}
                onExit={() => setStatusModal(false)}
            >
                <ModalBody>{message}</ModalBody>
                <ModalFooter>
                    <Button
                        onClick={() => {
                            setStatusModal(false);
                        }}
                        className="btn-sm btn-primary"
                    >
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default ListCard;
