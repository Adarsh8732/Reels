import logo from './logo.svg';
import './App.css';
import Login from './Login';
import auth from './firebase';
import React,{useState,useEffect} from 'react';
import { async } from '@firebase/util';
function App() {
  const[email,setEmail]=useState("");
  const [password,setPassword]=useState('');
  const[loader,setLoader]=useState(false);
  const[error,setError]=useState(false);
  const[user,setUser]=useState(null);
  const[mainLoader,setMainLoader]=useState(true);
  const handlelogout = async ()=>{
    setLoader(true);
    auth.signOut();
    setLoader(false);
  }
  const handleSubmit=async ()=>{
    try{
      setLoader(true);
      let res = await auth.signInWithEmailAndPassword(email,password);
      // console.log(res.user);
      setUser(res.user);
      setLoader(false);
    }catch(err){
      setError(true);
      setLoader(false);
    }
    setEmail("");
    setPassword("");
  }
  function gotoLogInPage(){
    setLoader(true);
    setError(false);
    setLoader(false);
  }
 useEffect(()=>{
   auth.onAuthStateChanged(user=>{
    //  console.log(user);

     setUser(user);
     setMainLoader(false);
   })
 },[])
  return (
    <>
    {
    mainLoader==true?<h1>wait for a sec</h1>:
    error==true ?
    <>
    <h1>Failed to login</h1>
    <input type="button" value="log in again" onClick={gotoLogInPage}></input>
    </>:
    loader==true?<h1>Loading..</h1>:
    user!=null?
    <>
    <h1>user logedIn{user.uid}</h1>
    <button onClick={handlelogout}>logout</button>
    </>:
      <>
      <h1>Firebase Login</h1>
      <input type="email" value={email}
        onChange={(e)=> {
          // console.log(email);
          setEmail(e.target.value)
        }}></input>
      <input type="password"
        value={password} onChange={(e) => {
          setPassword(e.target.value)
        }}
      ></input>
      <input type="button" value="submit" onClick={handleSubmit}></input>
    </>
    }
    </>
  );
}

export default App;
