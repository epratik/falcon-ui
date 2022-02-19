import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import imgNotAvailable from '../images/imgNotAvailable.png'
import { useState, useEffect } from 'react';
import ListDetails from './ListDetails';
import { likePost, unlikePost } from "../service/PostService.js";
import { follow, unfollow } from "../service/UserService.js";
import { getAvatar } from "../service/AvatarService.js";
import { getPostsForAList } from "../service/PostService.js";
import { updateViews } from "../service/ListService.js";
import GoogleInFeedAd from "./GoogleInFeedAd";

const Post = (props) => {

    const [show, setShow] = useState(false);
    const [items, setItems] = useState([])
    const [folOrUnFol, setfolOrUnFol] = useState(() => {
        if (props.item.post.isFollowing)
            return "Unfollow";
        else
            return "Follow";
    });
    const [likeOrUnlike, setLikeOrUnlike] = useState('Like');
    const [listSpinner, setListSpinner] = useState(false);
    const [followSpinner, setFollowSpinner] = useState(false);
    const [likeSpinner, setLikeSpinner] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getPosts = (listId) => {
        getPostsForAList(listId).then(res => {
            setItems(res);
            handleShow();
            setListSpinner(false)
        }).catch(() => {
            setListSpinner(false)
        })
    }

    const onClickShowList = (listId) => {
        setListSpinner(true)
        getPosts(listId);
        updateViews(listId);
    }
    
    const followOnClick = (props) => {
        setFollowSpinner(true);
        //call api
        if (folOrUnFol === 'Follow') {
            follow(props.item.post.userId).then(() => {
                setfolOrUnFol('Unfollow');
                setFollowSpinner(false);
            }).catch(() => {
                setFollowSpinner(false)
            })
        }
        else {
            unfollow(props.item.post.userId).then(() => {
                setfolOrUnFol('Follow');
                setFollowSpinner(false);
            }).catch(() => {
                setFollowSpinner(false)
            })
        }
    }

    const likeOnClick = (props) => {
        setLikeSpinner(true);
        //call api
        if (likeOrUnlike === 'Like') {
            likePost(props.item.post.postId).then(() => {
                setLikeSpinner(false);
                props.item.post.likes++;
                setLikeOrUnlike('Unlike');
            }).catch(() => {
                setLikeSpinner(false)
            })
        }
        else {
            unlikePost(props.item.post.postId).then(() => {
                setLikeSpinner(false);
                props.item.post.likes--;
                setLikeOrUnlike('Like');
            }).catch(() => {
                setLikeSpinner(false)
            })

        }
    }

    return (
        <div>
            <div className="card mb-1 mt-2 mx-auto border-light" style={{ width: "25rem", backgroundColor: "#E6E6E6" }}>
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
                            List Name - <b>{props.item.post.listName}</b> <br />
                        </p>     
                        <a href={props.item.post.url}>
                        <img
                            src={(props.item.preview && props.item.preview.images && props.item.preview.images[0]) ? props.item.preview.images[0] : imgNotAvailable}
                            style={{ width: '25rem', height: '15rem' }}
                            />
                        </a>
                        <br />
                        <p className="ms-2">
                            {props.item.post.urlDescription}<br />
                            <button type="button" disabled={props.item.post.userId == props.userId} className="btn btn-primary mt-2" onClick={() => followOnClick(props)}>
                                {followSpinner && <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" />}
                                {folOrUnFol}
                            </button>
                            <button type="button" disabled={props.item.post.userId == props.userId} className="btn btn-primary position-relative mt-2 ms-2" onClick={() => likeOnClick(props)}>
                                {likeSpinner && <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" />}
                                {likeOrUnlike}
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {props.item.post.likes}
                                    <span className="visually-hidden">unread messages</span>
                                </span>
                            </button>
                            <button type="button" className="btn btn-secondary ms-5 mt-2" onClick={() => onClickShowList(props.item.post.listId)}>
                                {listSpinner && <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" />}
                                Show List
                            </button>
                            <ListDetails items={items} isReadOnly={true} show={show} handleClose={handleClose} />
                        </p>
                    </div>
                </div>
            </div>
            {/* <br />
            {props.adId == 0 && <GoogleInFeedAd></GoogleInFeedAd>}
            {props.adId == 0 && <br />} */}
        </div>
    )
}

export default Post
