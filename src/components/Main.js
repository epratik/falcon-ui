
import 'bootstrap/dist/css/bootstrap.min.css'
import '../index.css'
import favicon from '../images/favicon.ico'
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import {useState, useEffect } from "react"
import Amplify, { Auth, Hub } from 'aws-amplify'
import awsconfig from '../config/awsconfig.json'
import awsauth from '../config/awsauth.json'
// import { browserHistory } from 'react-router'
import { withRouter } from "react-router-dom";

function Main(props) {

    // const { push } = useHistory();
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [callLists, setCallLists] = useState(true)

    useEffect(() => {
        async function getUser() {
          const user = await Amplify.Auth.currentAuthenticatedUser()
          if (user) {
              setLoggedIn(true);
          }
        }
        getUser();
    }, []);
    
    useEffect(() => {        
        let search = window.location.search;
        let params = new URLSearchParams(search);
        if (params.get('listId') && callLists) {
            props.history.push({ pathname: "/lists" });
            setCallLists(false);
        }
    }, [callLists])
    
    useEffect(() => {
        Amplify.configure(awsconfig)
        Auth.configure({ oauth: awsauth })
        Hub.listen('auth', ({ payload: { event, data } }) => {
            switch (event) {
                case 'signIn':
                    console.log('sign in', event, data)
                    setLoggedIn(true)
                    props.history.push('/home')
                    break
                case 'signOut':
                    console.log('sign out')
                    setLoggedIn(false);
                    props.history.push('/')
                    // this.setState({ user: null })
                    break
                default:
                    break
            }
        })
    }, [props]);

    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home" >
                        <img src={favicon} className="d-inline-block align-top"  style={{ width: "2rem", height: "2rem"}} />
                        {' '}<h5 style={{ display: "inline" }}>ContenHub</h5>
                        {/* {' '}<i style={{fontSize: '16px'}}>find and share what you like</i> */}
                    </Navbar.Brand>          
                    <Nav className="me-auto">
                    </Nav>
                    {!isLoggedIn && <Button className="btn btn-primary" onClick={() => Auth.federatedSignIn()}>Sign In</Button>}
                    {isLoggedIn && <Button className="btn btn-primary" onClick={() => Auth.signOut()}>Sign Out</Button>}
                </Container> 
            </Navbar>
        </div>
    );
}

export default withRouter(Main);
