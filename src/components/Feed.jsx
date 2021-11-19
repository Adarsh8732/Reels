import React,{useEffect,useState,useContext} from 'react'
import { AuthContext } from '../contexts/AuthProvider';
import {makeStyles} from '@mui/styles';
import { IconButton,Button } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { storage,firestore,database } from '../firebase';
import uuid from 'react-uuid'
function Feed() {
    const useStyle = makeStyles((theme)=>({
        root:{
            // '& > *':{
            //     margin:theme.spacing(1)
            // },
            input:{
                display:"none",
            },
        }
    }));
    const classes = useStyle();
    const[loading,setLoading] = useState(false);
    const[error,setError] = useState(false);
    const {signout} = useContext(AuthContext);
    const handleLogout = async (e)=>{
        e.preventDefault();
        try{
            setLoading(true);
            await signout();
            setLoading(false);
        }
        catch(err){
            console.log(err);
            setLoading(false);
        }
    }
    const handleInputFile = (e)=>{
        e.preventDefault();
        let file = e?.target?.files[0];
        if(file!=null){
            console.log(e.target.files[0]);
            try{
                setLoading(true);
                let puid = uuid();
                const uploadTaskListener = storage
                    .ref(`/posts/${puid}`).put(file);

                    uploadTaskListener.on('state_changed', fn1, fn2, fn3);
                    function fn1(snapshot) {
                        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log(progress);
                    }
                    function fn2(error) {
                        setError(error);
                        setLoading(false);
                    }
                    async function fn3() {
                        let posobj={
                            likes:[],
                            comment:[],
                        }
                        // link get 
                        //  let puid=make postDocument and put in post collection
                        // put this puid into the current users
                    }    

            }
            catch(err){

            }
        }
    }
    return (
       <div>
           <div className="navbar">
               <button onClick={handleLogout} disabled={loading}>Logout</button>
           </div>
           <div className="uploadImage">
                <div className={classes.root}>
                    <input accept="image/*" className={classes.input} id="icon-button-file" type="file"
                        onChange={handleInputFile}
                    />
                    <label htmlFor="icon-button-file">
                        <Button variant="contained" color="primary" component="span" disabled={loading} endIcon={<PhotoCamera />}>
                            Upload
                        </Button>
                    </label>
                </div>
            </div>
            <div className="feed">
                Feed
            </div>
       </div>
    )
}

export default Feed
