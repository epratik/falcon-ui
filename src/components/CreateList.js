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
      <div class="mb-3">
        <label for="listName" class="form-label">List Name</label>
        <input type="text" class="form-control" id="listName" aria-describedby="listNameHelp"/>
        <div id="listNameHelp" class="form-text">Your links are added to lists, please specify a list name</div>
      </div>
      <div class="mb-3">
        <label for="listDescription" class="form-label">List Description</label>
        <input type="text" class="form-control" id="listDescription" aria-describedby="listDescriptionHelp"/>
        <div id="listDescriptionHelp" class="form-text">What kind of content is present in this list?</div>
      </div>
      <div class="mb-3">
        <label for="tag" class="form-label">Tag</label>
        <input type="text" class="form-control" id="tag" aria-describedby="tagHelp"/>
        <div id="tagHelp" class="form-text">Select a tag name that best describes your list</div>
      </div>
       <div class="mb-3">
        <label for="url" class="form-label">URL</label>
        <input type="text" class="form-control" id="url" aria-describedby="urlHelp"/>
        <div id="urlHelp" class="form-text">Provide the link you want to share</div>
      </div>
      <div class="mb-3">
        <label for="urlDescription" class="form-label">URL Description</label>
        <input type="text" class="form-control" id="urlDescription" aria-describedby="urlDescriptionHelp"/>
        <div id="urlDescriptionHelp" class="form-text">What is the link about?</div>
      </div>
      </ModalBody>
      <ModalFooter>
       <Button onClick={props.handleClose}>Cancel</Button>
          <Button>Save</Button>
      </ModalFooter>
  </Modal>

    )
}

export default CreateList
