import React , {useState , useEffect} from 'react'
import styled from 'styled-components'
import Logo from '../assets/Logo.png'
import Logout from './Logout'

export default function Contacts({ contacts,currentUser,changeChat }) {
    
    const [currentUserName, setcurrentUserName] = useState(undefined)
    const [currentUserImage, setcurrentUserImage] = useState(undefined)
    const [currentSelected, setcurrentSelected] = useState(undefined)
    
   
    useEffect(() => {
        async function currenUser(){
        if(currentUser){
            await  setcurrentUserImage(currentUser.avatarImage);
            await  setcurrentUserName(currentUser.username);
        }
    }
    currenUser();
    },[currentUser])

    const changeCurrentChat = async (index,contact) =>{
       await setcurrentSelected(index);
       await changeChat(contact);
    };

  return (
    <>
    {
        currentUserName && currentUserImage && (
            <Container>
                <div className='brands'>
                    <img src={Logo} alt="Logo" />
                    <h3>MAD # TAG</h3>
                </div>  
                <div className='contacts'>
                   {
                    contacts.map((contact,index) => {
                       return (
                          <div 
                           className={`contact ${index === currentSelected && "selected"}`} 
                           key={index}
                           onClick={() => changeCurrentChat(index,contact)}>
                            <div className='avatar'>
                             <img src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                              alt="avatar"/>
                            </div>
                            <div className='username'>
                               <h3>{contact.username}</h3>
                            </div>
                          </div>
                       )})}
                </div>
                <div className='current-user'>
                    <div className='avatar'>
                        <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt="avatar" />
                    </div>
                    <div className='username'>
                        <h2>{currentUserName}</h2>
                    </div>
                    <Logout/>
                </div>
            </Container>
        )
    }
    </>
  )
}
const Container = styled.div`
 display:grid;
 grid-template-rows:14% 75% 15%;
 overflow:hidden;
 border-radius:0.3rem;
 background-color:#7D7098;
 .brands{
    display:flex;
    align-items:center;
    justify-content:center;
    gap:1rem;
    img{
        height:4rem;
    }
    h3{
        color:white;
        text-transform:uppercase;
    }
 }
 .contacts{
    display:flex;
    flex-direction:column;
    align-items:center;
    overflow:auto;
    gap:0.8rem;&::-webkit-scrollbar{
        width:0.2rem;
        &-thumb{
            background-color:#fffffff39;
            width:0.1rem;
            border-radius:1rem;
        }

    }
 }
 .contact{
    background-color:#ffffff39;
    min-height:5rem;
    width:90%;
    cursor:pointer;
    border-radius:0.3rem;
    padding:0.4rem;
    gap:1rem;
    align-items:center;
    display:flex;
    transition: 0.5s ease-in-out;
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
 .selected{
    background-color:#9186f3;
  }
}
.current-user{
    background-color:#7D7098;
    display:flex;
    justify-content: center ;
    align-items: center;
    border-radius:0.3rem;
    gap: 2rem ;
    .avatar{
        img{
            height:3rem;
            max-inline-size: 100%;
        }
    }
    .username{
        h2{
            color:white;
        }
    }
    @media (min-width: 720px) and (max-width: 1024px) {     
        .username{
            h2{
                font-size:1rem;
            }
        }
    }
}
`;

