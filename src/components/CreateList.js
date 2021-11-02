import React from 'react'
import {  Button } from 'react-bootstrap'
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";

const CreateList = (props) => {
  return (

    <Modal show={props.show} onHide={props.handleClose}>
      <ModalHeader>
        <ModalTitle>Post a link</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <form>
          <div className="mb-3">
            <label for="listName" className="form-label">List Name</label>
            <input type="text" className="form-control" id="listName" aria-describedby="listNameHelp" />
            <div id="listNameHelp" className="form-text">Your links are added to lists, please specify a list name</div>
          </div>
          <div className="mb-3">
            <label for="listDescription" className="form-label">List Description</label>
            <input type="text" className="form-control" id="listDescription" aria-describedby="listDescriptionHelp" />
            <div id="listDescriptionHelp" className="form-text">What kind of content is present in this list?</div>
          </div>
          <div className="mb-3">
            <label for="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" id="tag" aria-describedby="tagHelp" />
            <div id="tagHelp" className="form-text">Select a tag name that best describes your list</div>
          </div>
          <div className="mb-3">
            <label for="url" className="form-label">URL</label>
            <input type="text" className="form-control" id="url" aria-describedby="urlHelp" />
            <div id="urlHelp" className="form-text">Provide the link you want to share</div>
          </div>
          <div className="mb-3">
            <label for="urlDescription" className="form-label">URL Description</label>
            <input type="text" className="form-control" id="urlDescription" aria-describedby="urlDescriptionHelp" />
            <div id="urlDescriptionHelp" className="form-text">What is the link about?</div>
          </div>
        </form>
      </ModalBody>
      <ModalFooter>
        <Button onClick={props.handleClose}>Cancel</Button>
        <Button>Save</Button>
      </ModalFooter>
    </Modal>

  )
}

export default CreateList
