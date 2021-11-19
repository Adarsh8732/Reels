import React,{useContext } from 'react'
import { Redirect } from 'react-router';
import {Switch,Route,BrowserRouter as Router,Link } from 'react-router-dom';
// import { Redirect } from 'react-router';
import Feed from './components/Feed';
import Login from './components/Login'     
import SignUp from './components/Signup'
import Profile from './components/Profile';
import { AuthContext, AuthProvider } from './contexts/AuthProvider';
// let isSignedUp = Math.random()>0.5?true:false;
// let isSignedUp = false;
function App() {
    return (
        <AuthProvider>
            <Router>
                <h1> App component</h1>
                <Switch>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/signup" component={SignUp}></Route>
                    <PrivateRoute path='/profile' comp={Profile}></PrivateRoute>
                    <PrivateRoute path='/' exact comp={Feed}></PrivateRoute>
                </Switch>
            </Router>
        </AuthProvider>
    )
}  
function PrivateRoute(props){
    console.log(props);
    let Component = props.comp;
    let {currentUser} = useContext(AuthContext);
    console.log(currentUser);
    return(
        <Route {...props} render={(props)=>{
            return(    
                 currentUser!=null?
                <Component {...props}></Component>:
                <Redirect to='/login'></Redirect>
            )
        }} ></Route>
    )
}
export default App
