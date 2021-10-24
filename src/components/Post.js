import React from 'react'
// import { Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
// import { Button } from 'bootstrap'

const Post = (props) => {
    return (
        <div>
            <div class="card bg-light mb-1 mt-2" style={{ width: "30rem" }}>
                <div class="d-flex">
                    <img
                        src="https://mdbootstrap.com/img/new/avatars/2.jpg"
                        alt={props.item.name}
                        class="me-3 rounded-circle"
                        style={{ width: '40px', height: '40px' }}
                    />
                    <div>
                        <h5 class="text-start">
                            {props.item.name}
                            <small class="text-muted"> {props.item.date}</small>
                        </h5>
                        <p class="text-start">
                            {props.item.listName} <br />
                            <a href={props.item.itemLink}>{props.item.itemLink}</a> <br />
                            <small class="text-muted"> check the full list here </small>
                            <a href={props.item.listLink}>{props.item.listName}</a><br />
                            <button type="button" class="btn btn-primary position-relative mt-2">
                                Like
                                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    99+
                                    <span class="visually-hidden">unread messages</span>
                                </span>
                            </button>
                        </p>
                    </div>
                </div>
            </div>
            <br />
        </div>
    )
}

export default Post
