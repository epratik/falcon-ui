
import React from 'react'
// import { Button } from 'react-bootstrap'
import { withRouter } from 'react-router-dom';
import findImage from '../images/contentpeople.jpg'
import landingimg from '../images/landingimg.jpg'
import { useEffect, useState } from "react";
import Amplify, { Auth, Hub } from 'aws-amplify'
import TopContent from "./TopContent.js";

const Landing = (props) => {
  const callSignIn = () => {
    Auth.federatedSignIn();
  }

  useEffect(() => {
    async function getUser() {
      const user = await Amplify.Auth.currentAuthenticatedUser()
      if (user) {
        props.history.push('/home');
      }
    }
    getUser();
  }, []);


  return (
    <div className="container py-4" >
      {/* <header class="pb-3 mb-4 border-bottom">
          <a href="/" class="d-flex align-items-center text-dark text-decoration-none">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="32" class="me-2" viewBox="0 0 118 94" role="img"><title>Bootstrap</title><path fill-rule="evenodd" clip-rule="evenodd" d="M24.509 0c-6.733 0-11.715 5.893-11.492 12.284.214 6.14-.064 14.092-2.066 20.577C8.943 39.365 5.547 43.485 0 44.014v5.972c5.547.529 8.943 4.649 10.951 11.153 2.002 6.485 2.28 14.437 2.066 20.577C12.794 88.106 17.776 94 24.51 94H93.5c6.733 0 11.714-5.893 11.491-12.284-.214-6.14.064-14.092 2.066-20.577 2.009-6.504 5.396-10.624 10.943-11.153v-5.972c-5.547-.529-8.934-4.649-10.943-11.153-2.002-6.484-2.28-14.437-2.066-20.577C105.214 5.894 100.233 0 93.5 0H24.508zM80 57.863C80 66.663 73.436 72 62.543 72H44a2 2 0 01-2-2V24a2 2 0 012-2h18.437c9.083 0 15.044 4.92 15.044 12.474 0 5.302-4.01 10.049-9.119 10.88v.277C75.317 46.394 80 51.21 80 57.863zM60.521 28.34H49.948v14.934h8.905c6.884 0 10.68-2.772 10.68-7.727 0-4.643-3.264-7.207-9.012-7.207zM49.948 49.2v16.458H60.91c7.167 0 10.964-2.876 10.964-8.281 0-5.406-3.903-8.178-11.425-8.178H49.948z" fill="currentColor"></path></svg>
            <span class="fs-4">GREPIN</span>
          </a>
        </header> */}
    

    
      <div className="row align-items-md-stretch" style={{ "max-height": "100vh"}} >
        <div className="col-md-6 overflow-auto" style={{ "max-height": "100vh"}}>
          <TopContent blockFollowLike={true}></TopContent>
        </div>
        <div className="col-md-6 p-5 border rounded-3 blur"
          style={{ backgroundColor: "#E4E4E4","height": "100vh", color: "#FFFFFF", backgroundImage: `url(${landingimg})`, backgroundSize: "cover" }}>
        <div className="py-5" >
            <h1 className="display-5 fw-bold">Create and share lists of curated content.</h1>
              {/* <ul class="entry-content fs-4" style={{"list-style-type": "circle"}}>
              <li>Explore our categories to find and rate top content.</li>
              <li>Share curated lists on social media.</li>
              <li>Easy affiliate marketing, share lists of products.</li>
              </ul> */}
            <p className="fs-4">Contact us at <small><b>conten.help@gmail.com</b></small></p>
          <button onClick={callSignIn} className="btn btn-primary btn-lg" type="button">Sign Up Now</button>
        </div>
      </div>
        {/* <div className="col-md-6 overflow-auto" style={{ "max-height": "100vh"}}>
          <div className="p-5 border rounded-3 text-light bg-dark" >
            <h2>How does it work?</h2>
            <p >Pretty simple, you mantain lists of videos and articles which the community can see. Links with most likes move to the top of the feed. Apart from this you also get a separate feed of people you have followed. </p>
            <button className="btn btn-primary" type="button" onClick={callSignIn}>Take a look</button>
          </div>
        </div> */}
      </div>
    </div>
  )
}

// export default Landing
export default withRouter(Landing);
