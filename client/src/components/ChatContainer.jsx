import React,{useState , useEffect, useRef} from 'react'
import styled from 'styled-components'
import ChatInput from './ChatInput'
import { sendChatMessageRoute,
         getAllMessage } from '../utils/APIRoutes'
import axios from 'axios'
import  {v4 as uuidv4 } from 'uuid'

export default function ChatContainer({currentChat , currentUser ,socket}) {
 
    const [message , setMessage] = useState([]) 
    const [arrivalMessage, setArrivalMessage] = useState(null)
    const scrollRef = useRef();

  useEffect(() =>{
    async function res() {   
      let data =  await axios.post(getAllMessage,{
          from:currentUser._id,
          to: currentChat._id
       });
       setMessage(data.data);
    }
    if(currentChat){
        res()
    }
  } ,[currentUser,currentChat])

  const handleSendMsg =  async (msg) => {
      await axios.post(sendChatMessageRoute,{
        from:currentUser._id,
        to:currentChat._id,
        message:msg,
      });
      await socket.current.emit('send-msg',{
        to:currentChat._id,
        from: currentUser._id,
        message: msg,
      })

      const  msgs = [...message]
      await msgs.push({fromSelf : true, message:msg})
      await setMessage(msgs)
  }

useEffect(()=>{
    async function socketCurrent(){
        if(socket.current){
           await socket.current.on('msg-received',(msg) =>{
                setArrivalMessage({fromSelf:false , message:msg})
            })}
    }
    socketCurrent()
},[socket])

useEffect(() =>{
    async function socketArrival(){
      await  arrivalMessage && setMessage((prev) => [...prev,arrivalMessage])
    }
    socketArrival()
},[arrivalMessage])


useEffect(() =>{
    async function scrollChat(){
      await scrollRef.current?.scrollIntoView({behaviour : 'smooth'})
    }
    scrollChat();
} , [message])

  return (
  <>
    {currentChat && (    
    <Container>
       <div className='chat-header'>
       <div className='user-details'>
       <div className='avatar'>
       <img src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
       alt="avatar"/>
       </div>
       <div className='username'>
            <h3>
            {currentChat.username}
           </h3>
        </div>
       </div>
       </div>
       <div className="chat-message">
          {message.map((msg) =>{
                return(  
                <div ref={scrollRef} key={uuidv4()}>
                    <div
                     className={`message ${msg.fromSelf ? "sended" : "received"}`}>
                            <div className="contents">
                                <p>
                                   {msg.message}
                                </p>
                            </div>
                        </div>
                    </div>
                )})}
       </div>
       <ChatInput handleSendMsg={handleSendMsg}/>
       </Container>
       )
    }
    </>
  )
} 

const Container = styled.div`
 padding-top: 1rem;
 display: grid;
 grid-template-rows:11% 78% 12%;
 gap:0.1rem;
 overflow: hidden;
 @media screen and (min-width: 720px) and (max-width: 1080px) { 
    grid-auto-rows:15% 70% 15%;
 }
 .chat-header{
    display: flex;
    justify-content:space-between;
    align-items:center;
    padding:0 2rem;
    .user-details{
        display: flex;
        align-items:center;
        gap:1rem;
        .avatar{
            img{
               height:3rem;
            }
        }
        .username{
            h3{
                color:white;
            }
        }
    }
 }
 .chat-message
 {
    padding:1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;&::-webkit-scrollbar{
        width: 0.2rem;
        &-thumb{
            background-color:#ffffff39;
            width:0.1rem;
            border-radius:1rem;
        } 
    }
    .message{
        display: flex;
        align-items: center;
        width: 85%;
        .contents{
            overflow-wrap:break-word;
            padding: 1rem;
            font-size:1.1rem;
            border-radius:1rem;
            color:#d1d1d1;
        }
    }
    .sended{
        justify-content: flex-start;
        .contents{
            background-color:#4f04ff21;
        }
    }
    .received{
        justify-content: flex-end;
        .contents{
            background-color:#9900ff20;
      }
   }
}
`;
