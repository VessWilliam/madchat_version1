import React,{useState} from 'react'
import styled from 'styled-components'
import Picker from 'emoji-picker-react'
import { IoIosPaperPlane } from 'react-icons/io'
import { RiBearSmileLine } from 'react-icons/ri'

export default function ChatInput({handleSendMsg}) {

  const [showEmojiPicker, setShowEmojiPicker] =useState(false);
  const [msg, setMsg] =useState("");

  const handleEmojiClick = async (event,emoji) => {
      let message = msg;
      message += await emoji.emoji;
      await setMsg(message);
   };   

  const  handleEmojiPickerHideandShow = async () => { 
      await setShowEmojiPicker(!showEmojiPicker);
  };

  const sendChat = async (event) => {
        await event.preventDefault();
        if(msg.length > 0) {
           await handleSendMsg(msg);
           await setMsg("");
           await setShowEmojiPicker(false);
        };
  };

  return (
    <Container>
       <div className='button-container'>
          <div className='emoji' >
            <RiBearSmileLine onClick={handleEmojiPickerHideandShow}/>
            {showEmojiPicker &&  <Picker onEmojiClick={handleEmojiClick}/>}
          </div>
       </div>
       <form className='input-container' onSubmit={(e)=>sendChat(e)}>
         <input type='text' placeholder='type your message here'
          value={msg} 
          onChange={(e)=>setMsg(e.target.value)}/>
         <button className='submit'>
            <IoIosPaperPlane />
         </button>
       </form>
    </Container>
  )
}


const Container = styled.div`
   display: grid;
   width:85%;
   grid-template-columns : 5% 88%;
   background-color :#00000076;
   align-items : center;
   padding:0 2rem;
   padding-bottom:0.3rem;
   @media screen and (min-width: 720px) and (max-width: 1080px){
     padding:0 1rem;
     gap: 1rem;
  }
   .button-container{
      display:flex;
      align-items : center;
      color : white;
      gap: 1rem;
      .emoji{
        position:relative;
        svg
        {
          font-size:2rem;
          color:#ffff00c8;
          cursor:pointer;
        }
        .emoji-picker-react{
          background-color:#080420;
          border-color:#ffffff34;
          box-shadow:0 5px 10px #ffffff34;
          position:absolute; 
          top:-350px;
          .emoji-scroll-wrapper::-webkit-scrollbar{
            background-color:#080420;
            width: 5px;
            &-thumb{
              background-color:#ffffff34;
            }
          }
          .emoji-categories{
            button{
              filter: contrast(0);
            }
          }
          .emoji-search{
            background-color:transparent;
            border-color:#ffffff34;
          }
          .emoji-group:before{
            background-color:#080420;
          }
        }
      }
    }
    .input-container{
      width:100%;
      border-radius:2rem;
      display:flex;
      align-items:center;
      gap:2rem;
      background-color:#ffffff34;
      border:none;
      input{
        width:100%; 
        background-color:transparent;
        color:white;
        border:none;
        padding-left:1rem;
        font-size:1.2rem;
      &::selection{
        background-color:#9186f3;
      }&:focus{
        outline:none;
      }
    }
    button{
      padding:0.3rem 2rem;
      border-radius:1rem;
      display:flex;
      justify-content:center;
      align-items:center;
      background-color:#7D7098;
      border:none;
      @media screen and (min-width: 720px) and (max-width: 1080px){
        padding: 0.3rem 1rem;
        svg{
          font-size: 1rem;
        }
      }
      svg{
          font-size:2rem;
          color:white;
      }
    } 
  }
`;