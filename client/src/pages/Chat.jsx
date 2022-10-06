import React,{useState , useEffect,useRef} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { allUsersRoute,host} from '../utils/APIRoutes'
import  Contacts from '../components/Contacts'
import Welcome from '../components/Welcome'
import ChatContainer from '../components/ChatContainer'
import {io} from 'socket.io-client'

const Chat = () => {
  
  const socket = useRef();
  const navigate = useNavigate();
  const[contacts,setContacts] = useState([]);
  const [currentUser,setCurrentUser] = useState(undefined);
  const [currentChat , setCurrentChat] = useState(undefined);
  const [isloaded , setIsloaded] = useState(false);

  useEffect(() => {

    async function nav() 
    {
    if(!localStorage.getItem("chat-app"))
    {
       await navigate("/login") 
  
    }else{
      await setCurrentUser(JSON.parse(localStorage.getItem("chat-app") ) );
      await setIsloaded(true);
    }}
    nav();
  },[navigate]);

  useEffect(() =>{
    async function addUserID(){
      if(currentUser){
         socket.current = await io(host);
         await socket.current.emit('add-user',currentUser._id);
      }
    }
    addUserID()
  },[currentUser])

  useEffect(() =>{
   async function current(){
    if(currentUser){
      if(currentUser.isAvatarImageSet){
        const data = await axios.get(`${allUsersRoute}/${currentUser._id}`)
        await setContacts(data.data)
      }  else {
        await navigate("/setavatar")
      }
    }};
    current()
   },[currentUser, navigate]);

   const handleChatChange = async (chat) =>{
       await setCurrentChat(chat);
   };

  return (
    <Container>
      <div className="container">
        <Contacts contacts={contacts}
          currentUser={currentUser}
          changeChat={handleChatChange} />
        { isloaded && (currentChat && currentUser) === undefined ? (
          <Welcome currentUser={currentUser}/>
        ):(
         <ChatContainer 
         currentChat={currentChat}
         currentUser={currentUser} 
         socket={socket}/>       
        )}
      </div>
    </Container>
  )
}

const Container = styled.div`
    height:100vh;
    width:100vw;
    display:flex;
    flex-direction:column;
    justify-content:center;
    gap: 1rem;
    align-items:center;
    background-color:#141414;
    .container{
      height:85vh;
      width:90vw;
      background-color: #00000076;
      display:grid;
      grid-template-columns:35% 75%;
      @media screen and (min-width:720px) and (max-width:1080px){
        grid-template-columns:35% 75%;
      } 
    }
`;

export default Chat

 