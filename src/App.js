
// import 'bootstrap/dist/css/bootstrap.min.css'
// import './index.css'
// import PageLayout from './components/PageLayout';
// import { BrowserRouter, Route, Switch } from "react-router-dom";
// import Landing from './components/Landing';
// import { Navbar, Container, Nav, Button } from 'react-bootstrap';
// import {useState, useEffect} from "react"
// import Amplify, { Auth, Hub } from 'aws-amplify'
// import awsconfig from './config/awsconfig.json'
// import awsauth from './config/awsauth.json'
// import { browserHistory } from 'react-router'
// import { withRouter, useHistory } from "react-router-dom";
import Main from './components/Main';

function App() {

  // const [isLoggedIn, setLoggedIn] = useState(false);

  // useEffect(() => {
  //   Amplify.configure(awsconfig)
  //   Auth.configure({ oauth: awsauth })
  //   Hub.listen('auth', ({ payload: { event, data } }) => {
  //     switch (event) {
  //       case 'signIn':
  //         console.log('sign in', event, data)
  //         setLoggedIn(true)
  //         // props.history.push('/home')
  //         break
  //       case 'signOut':
  //         console.log('sign out')
  //         // this.setState({ user: null })
  //         break
  //       default:
  //         break
  //     }
  //   })
  // }, []);

  return (
    <Main></Main>
    // <BrowserRouter>
    //   <div>
    //     <Navbar bg="dark" variant="dark">
    //       <Container>
    //         <Navbar.Brand href="#home">GREPIN</Navbar.Brand>
    //         <Nav className="me-auto">
    //         </Nav>
    //         {!isLoggedIn && <Button className="btn btn-primary" onClick={() => Auth.federatedSignIn()}>Sign In</Button>}
    //         {isLoggedIn && <Button className="btn btn-primary" onClick={() => Auth.signOut()}>Sign Out</Button>}
    //       </Container>
    //     </Navbar>
    //   </div>
    //   <Switch>
    //     <Route exact path="/" component={Landing} />
    //     <Route exact path="/home" component={PageLayout}></Route>
    //   </Switch>
    // </BrowserRouter>
  );
}

export default App;
