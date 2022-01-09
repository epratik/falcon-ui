import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import profilepic from '../images/profilepic.png'
import imgNotAvailable from '../images/imgNotAvailable.png'
import {useState} from 'react'
import ListDetails from './ListDetails';
import listItems from '../data/items.json'
import { likePost, unlikePost } from "../service/PostService.js";
import { getAvatar } from "../service/AvatarService.js";

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

    const likeOnClick = (props) => {
        //call api
        if (likeOrUnlike === 'Like') {
            likePost(props.item.post.postId);
            props.item.post.likes++;
            setLikeOrUnlike('Unlike');
        }
        else {
            unlikePost(props.item.post.postId);
            props.item.post.likes--;
            setLikeOrUnlike('Like');
        }
    }

    return (
        <div>
            <div className="card mb-1 mt-2 mx-auto border-light" style={{ width: "25rem",backgroundColor:"#E6E6E6" }}>
                <div className="">
                    <img
                        src={getAvatar(props.item.post.userName)}
                        //alt={props.item.name}
                        alt={props.item.post.userName}
                        className="me-3 mt-1 rounded-circle"
                        style={{ width: '40px', height: '40px' }}
                    />
                  
                    <medium className="fs-5"> {props.item.post.userName}</medium>
                    <small className="text-muted"> {props.item.post.date}</small>
                    
                    <div>
                        
                        <p className="ms-2">
                            Part of {props.item.post.listName} <br />
                        </p>
                            <img
                                src={(props.item.preview && props.item.preview.images[0]) ? props.item.preview.images[0] : imgNotAvailable}
                                style={{ width: '25rem', height:'15rem' }}
                            />
                            <br />
                        <p className="ms-2">
                            <a href={props.item.post.url} target="_blank" rel="noopener noreferrer" >{props.item.post.urlDescription}</a> <br />
                            <button type="button" className="btn btn-primary mt-2" onClick={followOnClick}> {folOrUnFol} </button>
                            <button type="button" className="btn btn-primary position-relative mt-2 ms-2" onClick={()=>likeOnClick(props)}>
                                {likeOrUnlike}
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {props.item.post.likes}
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
