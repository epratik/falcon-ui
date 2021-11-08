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
import { useState, useRef } from 'react'

const CreateList = (props) => {

  const inputRef = React.createRef();
  const [listNameValue, setListNameValue] = useState('');

  const setSelectedValue = (value) => {
    console.log(inputRef)
    console.log("selected value")
    console.log(value)
    setListNameValue(value);
    inputRef.current.onChange();
  }
  
  const validationSchema = Yup.object().shape({
    listName: Yup.string()
      .required("List name is required"),
    listDescription: Yup.string()
      .required("List description is required"),
    tag: Yup.string()
      .required("Tag is required"),
    url: Yup.string()
      .required("Url is required"),
    urlDescription: Yup.string()
      .required("Url description is required")
  });
  
  return (

    <Modal show={props.show} onHide={props.handleClose}>
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
          onSubmit={values => {
            // same shape as initial values
            console.log(values);
          }}
        >

          {({ errors, touched, handleChange }) =>
          (
            <Form>
              <div className="mb-3">
                <label for="listName" className="form-label">List Name</label>
                <AutoSuggest setParentValue={setSelectedValue}></AutoSuggest>
                <input ref={inputRef} className="form-control" value={listNameValue} onChange={handleChange("listName")} name="listName" aria-describedby="listNameHelp" />
                <div id="listNameHelp" className="form-text">Your links are added to lists, please specify a list name</div>
                {touched.listName && errors.listName ? <div className="text-danger"> {errors.listName} </div> : null}
              </div>
              <div className="mb-3">
                <label for="listDescription" className="form-label">List Description</label>
                <Field className="form-control" name="listDescription" aria-describedby="listDescriptionHelp" />
                <div id="listDescriptionHelp" className="form-text">What kind of content is present in this list?</div>
                {touched.listDescription && errors.listDescription ? <div className="text-danger"> {errors.listDescription} </div> : null}
              </div>
              <div className="mb-3">
                 <label for="tag" className="form-label">Tag</label>
                {/*<Field className="form-control" name="tag" aria-describedby="tagHelp" />
                {touched.tag && errors.tag ? <div className="text-danger"> {errors.tag} </div> : null} */}
                <div className="mb-3">
                  <AutoSuggest placeholder=""></AutoSuggest>
                </div>
                <div id="tagHelp" className="form-text">Select a tag name that best describes your list</div>
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
              <Button type="submit">Save</Button>
            </Form>
          )}
        </Formik>
      </ModalBody>
      <ModalFooter>
        <Button onClick={props.handleClose}>Cancel</Button>
      </ModalFooter>
    </Modal>

  )
}

export default CreateList
