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
        <section class="col-lg-3 ms-2" key={props.list.listId}>
            <div className="card bg-light mb-3" style={{ maxWidth: "18rem" }}>
                <div className="card-header">{props.list.name}</div>
                <div className="card-body">
                    <ListDetails
                        items={items}
                        isReadOnly={false}
                        show={show}
                        handleClose={handleClose}
                    />
                    <h5 className="card-title">{props.list.views} Views</h5>
                    <p className="card-text">{props.list.description}</p>
                    <Button
                        className="btn btn-secondary"
                        onClick={() => onClickShowLists(props.list.listId)}
                    >
                        {spinner && (
                            <span
                                class="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true"
                            />
                        )}
                        Show List
                    </Button>
                </div>
            </div>
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
        </section>
    );
};

export default ListCard;
