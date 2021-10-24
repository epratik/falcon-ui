import React from 'react'
// import { Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
// import { Button } from 'bootstrap'

const Post = () => {
    return (
        <div class="card" style={{ width: "30rem" }}>
            <div class="d-flex">
                <img
                    src="https://mdbootstrap.com/img/new/avatars/2.jpg"
                    alt="John Doe"
                    class="me-3 rounded-circle"
                    style={{ width: '40px', height: '40px' }}
                />
                <div>
                    <h5 class="text-start">
                        John Doe
                        <small class="text-muted"> Posted on February 19, 2021</small>
                    </h5>
                    <p class="text-start">
                        Ankur Warikoo's start up ideas for 2021 <br />
                        <a href="https://www.youtube.com/watch?v=3p8G1SrW6Hk">https://www.youtube.com/watch?v=3p8G1SrW6Hk</a> <br />
                        <small class="text-muted"> check the full list here </small>
                        <a href="https://www.youtube.com/channel/UCRzYN32xtBf3Yxsx5BvJWJw">Best of Ankur Warikoo</a><br />
                        <strong class="text-muted"> 91 Views </strong>
                    </p>
                    <p class="text-start">
                     
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Post
