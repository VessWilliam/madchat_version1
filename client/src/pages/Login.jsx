import React ,{ useEffect , useState }  from 'react';
import styled from 'styled-components';
import {Link , useNavigate} from 'react-router-dom';
import Logo from '../assets/Logo.png'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { loginRoute } from '../utils/APIRoutes';

function Registered() {
    
    const navigate = useNavigate();  

    const [values, setValues] = useState({
        username: "",
        password: "",   
    });
    
    useEffect(() =>{
      async function nav() 
      { 
        await localStorage.getItem("chat-app") && navigate("/");
      }
      nav()
  },[navigate]);

    const toastOptions = {
      position: "bottom-right",
      autoClose: 8000,
      pauseOnHover : true,
      draggable: true,
      theme: "dark"
    }
    const {password, username} = values;
     
    const handleSubmit = async (event) =>{
       await event.preventDefault();
        if(await handleValidation()){
          
              const {data} = await axios.post( await loginRoute, {
              username,
              password,
           });
           if(await data.status === false) {
            console.log("Validation", loginRoute)
            await toast.error(data.msg , toastOptions);
          } 
           if(await data.status === true) {
           await localStorage.setItem( "chat-app" , JSON.stringify(data.user));
           await navigate("/");
            }
        }
    };
     
   const handleValidation = async () => {
     if(password === "") {
        await toast.error("Email and password required", toastOptions); 
        return false;
     }
     else if (username.length === ""){
       await toast.error("Email and password required", toastOptions);
       return false;
     }
     return true;
   }
    const handleChange = async (event) =>{
      await setValues({...values, [event.target.name]: event.target.value}) 
    }

  return (
    <>
    <FormContainer>
     <form onSubmit={(event) => handleSubmit(event)}>
        <div className='brand'> 
          <img src={Logo}  alt="lolo" />
        </div>
        <div className='brand'>
          <h1>Mad # Tag</h1>
        </div>

          <input type="text" 
          placeholder="Username" 
          name="username"
          onChange={(e)=> handleChange(e)}
          min= "3" 
          />

          <input type="password" 
          placeholder="Password" 
          name="password" 
          onChange={(e)=> handleChange(e)}/>

          <button type="submit">Login User</button>
          <span> already have an account ?  
            <Link to="/register"> Register </Link> </span>
      </form> 
    </FormContainer>
    <ToastContainer/>
    </>
  )
}

const FormContainer = styled.div
`
height: 100vh ;
weight: 100vw ;
display : flex ;
flex-direction: column;
justify-content: center;
gap: 1rem ;
align-items: center ;
background-color: #141414;
.brand{
  display: flex;
  align-items: center ;
  gap: 1rem ;
  justify-content: center ; 
  img{
    height: 8rem;
  }
  h1{
    color:white;
    text-transform: uppercase;
  }
}
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
    input{
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #997af0;
      border-radius: 0.4rem;
      color: white;
      width: 100%;
      font-size:1rem;
      &:focus{
        border: 0.1rem solid #c985d6;
        outline:none
      }
    }
    button{
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
    }
    span{
      color: white;
      text-transform: uppercase;
      a{
        text-decoration: none;
        color: #4e0eff;
        text-transform: none;
        font-weight: bold;
      }
    }
  }
`;

export default Registered;