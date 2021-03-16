import React, {useState} from 'react'
import Navbar from './components/Navbar';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import SignIn from './components/pages/SignIn';
import SignUp from './components/pages/SignUp';
import Forget from './components/pages/Forget';
import './components/Navbar.css'
import useToken from './useToken';
import MyCart from './components/pages/MyCart'
import Albums from './components/Albums';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState(null);
  const {token, saveToken, removeToken} = useToken();
  const [myorder, setMyOrder] = useState({});
  
  return (
       <Router>
       <Navbar onClick={()=> {removeToken(token);setLoggedIn(false)}} props={{token:token,loggedIn:loggedIn,username:username}}/>
       
       <Switch>
         <Route path='/' exact render={(props)=><Albums setOrder={setMyOrder} props={{loggedIn:loggedIn,myorder:myorder,token:token}}/>} />
         <Route path='/sign-in' render={(props) => (token || loggedIn? <Redirect to="/"/> : <SignIn setlog={setLoggedIn} setuser={setUsername} settoken={saveToken} {...props}/>)}/>
         <Route path='/sign-up' component={SignUp} />
         <Route path='/my-cart' render={(props)=><MyCart setOrder={setMyOrder} props={{data:myorder}}/>} />
         <Route path='/forget-form' component={Forget} />
       </Switch>
     </Router>
  )
}

export default App;