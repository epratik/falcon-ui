import React from 'react'
import AutoSuggest from './AutoSuggest';
import {  Button } from 'react-bootstrap'
import Modal from "react-bootstrap/Modal";
// import Form from "react-bootstrap/Form";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";
import { Formik, Form, Field } from 'formik';
import * as Yup from "yup";
import { useState, useRef, useEffect, useCallback } from 'react'

const CreateList = (props) => {

  const tags = [
    { label: "tag1", value: "tag1" },
    { label: "tag2", value: "tag2" },
    { label: "tag3", value: "tag3" }
  ]

  const [listNameValue, setListNameValue] = useState('');
  const [errListName, setErrListName] = useState('');

  const clearState = () => {
    setListNameValue('');
    props.handleClose();
  }

  const setListName = (value) => {
    setListNameValue(value);
    if (listNameValue.length < 4 || listNameValue.length > 20)
      setErrListName('List name must be 4 to 20 character long.')
    else
      setErrListName('');
  }

  const validationSchema = Yup.object().shape({
    // listName: Yup.string()
    //   .required("List name is required"),
    listDescription: Yup.string()
      .required("List description is required"),
    // tag: Yup.string()
    //   .required("Tag is required"),
    url: Yup.string()
      .required("Url is required"),
    urlDescription: Yup.string()
      .required("Url description is required")
  });
  
  return (
    <Modal show={props.show} onHide={clearState}>
      <ModalHeader>
        <ModalTitle>Post a link</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <Formik
          initialValues={{
            listName: "",
            listDescription: "",
            tag: "",
            url: "",
            urlDescription: ""
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
          }}
        >

          {({ errors, touched, handleChange }) =>
          (
            <Form>
              <div className="mb-3" >
                <label for="listName" className="form-label">List Name</label>
                <AutoSuggest setParentValue={setListName}></AutoSuggest>
                {/* <input ref={inputRef} className="form-control" value={listNameValue} onKeyPress={(e)=>console.log(e.key)} onChange={handleChange("listName")} name="listName" aria-describedby="listNameHelp" /> */}
                <div id="listNameHelp" className="form-text">Your links are added to lists, please specify a list name</div>
                {errListName ? <div className="text-danger"> {errListName} </div> : null}
              </div>
              <div className="mb-3">
                <label for="listDescription" className="form-label">List Description</label>
                <Field className="form-control" name="listDescription" aria-describedby="listDescriptionHelp" />
                <div id="listDescriptionHelp" className="form-text">What kind of content is present in this list?</div>
                {touched.listDescription && errors.listDescription ? <div className="text-danger"> {errors.listDescription} </div> : null}
              </div>
              <div className="mb-3">
                <label for="tag" className="form-label">Tag</label>
                <Field as="select" className="form-control" name="tag">
                  <option value="Select a Tag">Select</option>
                  {tags.map((tag) => <option value={tag.value}>{tag.label}</option>)}
                </Field>
                {/*<Field className="form-control" name="tag" aria-describedby="tagHelp" />
                {touched.tag && errors.tag ? <div className="text-danger"> {errors.tag} </div> : null} */}
                <div id="tagHelp" className="form-text">Select a tag name that best describes your list</div>
                {touched.tag && errors.tag ? <div className="text-danger"> {errors.tag} </div> : null}
              </div>
              <div className="mb-3">
                <label for="url" className="form-label">URL</label>
                <Field className="form-control" name="url" aria-describedby="urlHelp" />
                <div id="urlHelp" className="form-text">Provide the link you want to share</div>
                {touched.url && errors.url ? <div className="text-danger">{errors.url} </div> : null}
              </div>
              <div className="mb-3">
                <label for="urlDescription" className="form-label">URL Description</label>
                <Field className="form-control" name="urlDescription" aria-describedby="urlDescriptionHelp" />
                <div id="urlDescriptionHelp" className="form-text">What is the link about?</div>
                {touched.urlDescription && errors.urlDescription ? <div className="text-danger"> {errors.urlDescription}</div> : null}
              </div>
              <div className="modal-footer">
                <Button type="submit">Save</Button>
                <Button className="ms-2 btn btn-danger" onClick={props.handleClose}>Cancel</Button>
              </div>
            </Form>
          )}
        </Formik>
      </ModalBody>
    </Modal>

  )
}

export default CreateList
