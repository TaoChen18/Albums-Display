import React, {useState} from 'react'
import Navbar from './components/Navbar';
import './App.css';
import Footer from './components/Footer';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import SignIn from './components/pages/SignIn';
import SignUp from './components/pages/SignUp';
import './components/Navbar.css'
import useToken from './useToken';
import MyCart from './components/pages/MyCart'

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const {token, saveToken, removeToken} = useToken();
  const [myorder, setMyOrder] = useState({});
  
  return (
       <Router>
       <Navbar onClick={()=> {removeToken(token);setLoggedIn(false)}} props={{token:token,loggedIn:loggedIn,username:username}}/>
       <Switch>
         <Route path='/' exact render={(props)=><Home onClick={()=>{setMyOrder({})}} props={{loggedIn:loggedIn,myorder:myorder}}/>} />
         <Route path='/sign-in' render={(props) => (token || loggedIn? <Redirect to="/"/> : <SignIn setlog={setLoggedIn} setuser={setUsername} setpassword={setPassword} settoken={saveToken} {...props}/>)}/>
         <Route path='/sign-up' component={SignUp} />
         <Route path='/my-cart' render={(props)=><MyCart props={{orderdata:myorder}}/>} />
       </Switch>
     </Router>
  )
}

export default App;