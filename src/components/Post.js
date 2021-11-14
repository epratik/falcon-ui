import React from 'react'
// import { Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
// import { Button } from 'bootstrap'
import profilepic from '../images/profilepic.png'
import {useState} from 'react'
import ListDetails from './ListDetails';
import listItems from '../data/items.json'

const Post = (props) => {

    const [show, setShow] = useState(false);
    // const [likeCount, setLikeCount] = useState('Follow');
    const [folOrUnFol, setfolOrUnFol] = useState('Follow');
    const [likeOrUnlike, setLikeOrUnlike] = useState('Like');
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const followOnClick = () => {
        //call api
        if (folOrUnFol === 'Follow')
            setfolOrUnFol('Unfollow');
        else
            setfolOrUnFol('Follow');
    }

    const likeOnClick = () => {
        //call api
        if (likeOrUnlike === 'Like') {
            setLikeOrUnlike('Unlike');
        }
        else {
            setLikeOrUnlike('Like');
        }
    }

    return (
        <div>
            <div className="card mb-1 mt-2" style={{ width: "30rem",backgroundColor:"#E4E4E4" }}>
                <div className="d-flex">
                    <img
                        src={profilepic}
                        alt={props.item.name}
                        className="me-3 rounded-circle"
                        style={{ width: '40px', height: '40px' }}
                    />
                    <div>
                        <h5 className="text-start">
                            {props.item.name}
                            <small className="text-muted"> {props.item.date}</small>
                        </h5>
                        <p className="text-start">
                            {props.item.listName} <br />
                            <a href={props.item.itemLink}>{props.item.itemLink}</a> <br />
                            {/* <small className="text-muted"> check the full list here </small>
                            <a href={props.item.listLink}>{props.item.listName}</a><br /> */}
                            <button type="button" className="btn btn-primary mt-2" onClick={followOnClick}> {folOrUnFol} </button>
                            <button type="button" className="btn btn-primary position-relative mt-2 ms-2" onClick={likeOnClick}>
                                {likeOrUnlike}
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    99+
                                    <span className="visually-hidden">unread messages</span>
                                </span>
                            </button>
                            <ListDetails items={listItems} isReadOnly={true} show={show} handleClose={handleClose} />
                            <button type="button" className="btn btn-secondary ms-5 mt-2" onClick={handleShow}>Show List</button>
                        </p>
                    </div>
                </div>
            </div>
            <br />
        </div>
    )
}

export default Post
