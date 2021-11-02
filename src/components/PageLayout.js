import React from 'react'
import Profile from './Profile.js'
// import { Button } from 'react-bootstrap'
// import { Button } from 'bootstrap'

const PageLayout = () => {
    return (
        <div className="container">
            <div className="row justify-content-md-center">
                <div className="col-lg-8" style={colStyle}>
                    <Profile/>
                </div>
            </div>
        </div>
    )
}
const colStyle = {
    backgroundColor: 'white'
};


// const divStyle = {
//     backgroundColor: '#dcdcdc',
//     marginTop:'20px'
// }
  
export default PageLayout