import React,{useEffect , useState} from 'react';
import{useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import { ToastContainer,toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import {Buffer} from 'buffer';
import loader from '../assets/loader.gif'
import { setAvatarRoute } from '../utils/APIRoutes';

export default function SetAvatar() {
  const api = "https://api.multiavatar.com/45678945";

  const navigate = useNavigate();

  const [avatar , setAvatar] = useState([]);
  const [isLoading , setIsLoading] = useState(true);
  const [selectAvatar , setSelectAvatar] = useState(undefined);

  const toastOptions = {
      position: "bottom-right",
      autoClose: 8000,
      pauseOnHover : true,
      draggable: true,
      theme: "dark"
    }

    useEffect(() =>{
        async function nav() 
        { 
          await !localStorage.getItem("chat-app") && navigate("/login");
        }
        nav()
    },[navigate]);

    const setProfilesPicture = async() => {
        if(selectAvatar === undefined){
           await toast.error("Please select an Avatar",toastOptions);
        }else{
            const user = await JSON.parse(localStorage.getItem("chat-app"));
            const {data} = await axios.post(`${setAvatarRoute}/${user._id}`,{image: avatar[selectAvatar]})
          if(data.isSet){
           user.isAvatarImageSet = true;
           user.avatarImage = data.image;
           await localStorage.setItem("chat-app", JSON.stringify(user));
           await navigate("/")
          }else{
           await toast.error("Error Setting Avatar",toastOptions);
          }
        }};

     useEffect(()=> {
        const data = [];
        async function loadData(){
            for (let i = 0; i < 4; i++) {
                const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
                const buffer = await new Buffer(image.data);
                await data.push(buffer.toString("base64"));      
              }  
              await setIsLoading(false);
              await setAvatar(data);
          };
         loadData();
    },[]);

  return(
    <>
    {
        isLoading ? <Container>
            <img src={loader} alt="loader" />
        </Container> :(

            <Container>
       <div className='title-container'>
           <h1>
            Pick An Avatar For Profile Picture
           </h1>
        <div className='avatar'>
           {
             avatar.map((avatars,index)=>{
                 return (
                     
                    <div key={index} className={`avatar ${selectAvatar === index && "selected"}`}>
                     
                     <img src={`data:image/svg+xml;base64,${avatars}`} alt="avatar" 
                        onClick={()=> setSelectAvatar(index)}/>
                    </div>
                )
            })
           }
         </div>
       </div>
       <button className='submit-btn' onClick={setProfilesPicture}>
        Set as Profile Picture
      </button>
    </Container>
    )}
    <ToastContainer/>
    </>
  )
  
}

const Container = styled.div`
display:flex;
justify-content: center;
align-items: center;
flex-direction: column;
gap:3rem;
background-color:#141414;
height:100vh;
wights:100vw;
.loader{
    max-inline-size:100%;
}
.title-container{
    h1{
        color: white;
    }
}
.avatar{
    display: flex;
    gap: 2rem;
    .avatar{
        border: 0.4rem solid transparent;
        padding: 0.4rem;
        border-radius: 5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        transition:0.5s ease-in-out;
        img{
            height: 6rem;
        }
    }
    .selected{
        border:0.4rem solid #c985d6;
    }
 }
    .submit-btn{
        background-color: #997af0;
        color: white;
        padding: 1rem 2rem;
        border: none;
        font-weight: bold;
        cursor: pointer;
        border-radius:0.4rem;
        font-size: 1rem;
        text-transform: uppercase; 
        transition: 0.5s ease-in-out;
        &:hover{
          background-color: #c985d6;
        }
    }`;