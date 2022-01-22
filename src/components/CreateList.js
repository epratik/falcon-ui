import React from "react";
import AutoSuggest from "./AutoSuggest";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
// import Form from "react-bootstrap/Form";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useState, useRef, useEffect, useCallback } from "react";
import tags from "../data/tags.json";
import { postList } from "../service/ListService";
import { postAUrl } from "../service/PostService";

const CreateList = (props) => {
  const [listNameValue, setListNameValue] = useState("");
  const [errListName, setErrListName] = useState("");
  const [tag, setTag] = useState("");
  const [subTags, setSubTag] = useState([]);
  const [isSubTagDisabled, setSubTagDisabled] = useState(true);
  const [showStatusModal, setStatusModal] = useState(false);
  const [message, setMessage] = useState("");
  const [disableSave, setDisableSave] = useState(false);

  const onTagSelect = (newTag) => {
    if (tags[newTag]) {
      setSubTagDisabled(false);
      setSubTag(tags[newTag]);
    } else setSubTagDisabled(true);
  };

  const clearState = () => {
    setListNameValue("");
    setDisableSave(false);
    props.handleClose();
  };

  const setListName = (value) => {
    setListNameValue(value);
    if (listNameValue.length < 4 || listNameValue.length > 20)
      setErrListName("List name must be 4 to 20 character long.");
    else setErrListName("");
  };

  const validationSchema = Yup.object().shape({
    // listName: Yup.string()
    //   .required("List name is required"),
    // listDescription: Yup.string()
    //   .required("List description is required"),
    tag: Yup.string().required("Tag is required"),
    url: Yup.string().required("Url is required"),
    urlDescription: Yup.string().required("Url description is required"),
  });

  return (
    <div>
      <Modal show={props.show} onHide={clearState}>
        <ModalHeader>
          <ModalTitle>Post a link</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              listName: "",
              tag: "",
              subTag: "",
              url: "",
              urlDescription: "",
            }}
            onTagSelect={onTagSelect}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              setDisableSave(true);
              values.listName = listNameValue;
              values.listId = Number((await postList(listNameValue, "")).value);
              const status = await postAUrl(values);
              if (status === 201) setMessage("Success! Your post is live.");
              else setMessage("Error! Please try again later.");
              props.handleClose();
              setStatusModal(true);
            }}
          >
            {({ errors, touched, handleChange, submitForm }) => (
              <Form>
                <div className="mb-3">
                  <label for="listName" className="form-label">
                    List Name
                  </label>
                  <AutoSuggest setParentValue={setListName}></AutoSuggest>
                  {/* <input ref={inputRef} className="form-control" value={listNameValue} onKeyPress={(e)=>console.log(e.key)} onChange={handleChange("listName")} name="listName" aria-describedby="listNameHelp" /> */}
                  <div id="listNameHelp" className="form-text">
                    Type to select an existing list or create a new one.
                  </div>
                  {errListName ? (
                    <div className="text-danger"> {errListName} </div>
                  ) : null}
                </div>
                {/* <div className="mb-3">
                <label for="listDescription" className="form-label">List Description</label>
                <Field className="form-control" name="listDescription" aria-describedby="listDescriptionHelp" />
                <div id="listDescriptionHelp" className="form-text">What kind of content is present in this list?</div>
                {touched.listDescription && errors.listDescription ? <div className="text-danger"> {errors.listDescription} </div> : null}
              </div> */}
                <div className="mb-3">
                  <label for="url" className="form-label">
                    URL
                  </label>
                  <Field
                    className="form-control"
                    name="url"
                    aria-describedby="urlHelp"
                  />
                  <div id="urlHelp" className="form-text">
                    Provide the link you want to share
                  </div>
                  {touched.url && errors.url ? (
                    <div className="text-danger">{errors.url} </div>
                  ) : null}
                </div>
                <div className="mb-3">
                  <label for="tag" className="form-label">
                    Category
                  </label>
                  <Field
                    as="select"
                    onChange={(event) => {
                      onTagSelect(event.target.value);
                      handleChange(event);
                    }}
                    className="form-control"
                    name="tag"
                  >
                    <option value="Select a category">Select</option>
                    {tags.tags.slice(2).map((tag) => (
                      <option value={tag}>{tag}</option>
                    ))}
                  </Field>
                  {/* <Field placeholder="" className="form-control" name="tag" aria-describedby="tagHelp" /> */}
                  <div id="tagHelp" className="form-text">
                    Select a relevant category for your post.
                  </div>
                  {touched.tag && errors.tag ? (
                    <div className="text-danger"> {errors.tag} </div>
                  ) : null}
                </div>
                <div className="mb-3">
                  <label for="tag" className="form-label">
                    Sub Category
                  </label>
                  <Field
                    as="select"
                    disabled={isSubTagDisabled}
                    onChange={(event) => handleChange(event)}
                    className="form-control"
                    name="subTag"
                  >
                    <option value="Select a sub category">Select</option>
                    {subTags.map((subTag) => (
                      <option value={subTag}>{subTag}</option>
                    ))}
                  </Field>
                  {/* <Field placeholder="" className="form-control" name="tag" aria-describedby="tagHelp" /> */}
                  <div id="tagHelp" className="form-text">
                    Select a sub category for your post.
                  </div>
                  {touched.subTag && errors.subTag ? (
                    <div className="text-danger"> {errors.subTag} </div>
                  ) : null}
                </div>
                <div className="mb-3">
                  <label for="urlDescription" className="form-label">
                    URL Description
                  </label>
                  <Field
                    className="form-control"
                    name="urlDescription"
                    aria-describedby="urlDescriptionHelp"
                  />
                  <div id="urlDescriptionHelp" className="form-text">
                    Short description about this url.
                  </div>
                  {touched.urlDescription && errors.urlDescription ? (
                    <div className="text-danger"> {errors.urlDescription}</div>
                  ) : null}
                </div>
                <div className="modal-footer">
                  <Button type="submit" disabled={disableSave}>
                    {disableSave && <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" />}
                    Save
                  </Button>
                  <Button
                    className="ms-2 btn btn-danger"
                    onClick={props.handleClose}
                  >
                    Cancel
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </Modal>
      <Modal centered size="sm" backdrop="true" show={showStatusModal} onExit={() => setStatusModal(false)} onHide={clearState}>
        <ModalBody>{message}</ModalBody>
        <ModalFooter>
          <Button
            onClick={() => { props.handleClose(); setStatusModal(false) }}
            className="btn-sm btn-primary">Close</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default CreateList;
