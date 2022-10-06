import React ,{ useEffect , useState }  from 'react';
import styled from 'styled-components';
import {Link , useNavigate} from 'react-router-dom';
import Logo from '../assets/Logo.png'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { registerRoute } from '../utils/APIRoutes';

function Register() {
    
    const navigate = useNavigate();  

    const [values, setValues] = useState({       
        username: "",
        email: "",
        password: "",
        confirmPassword: "",  
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
    const {password, confirmPassword, email,username} = values;

    const handleSubmit = async (event) =>{
        await event.preventDefault();
        if(await handleValidation()){
          console.log("Validation", registerRoute)
         const{data} = await axios.post( await registerRoute,{
              username,
              email,
              password, 
           });
           if(await data.status === false) { await toast.error(data.msg , toastOptions);}
           if(await data.status === true) {
            await  localStorage.setItem( "chat-app" , JSON.stringify(data.user));
            await navigate("/");
            }
        }
    };
     
   const handleValidation = async () => {
   
     if(password !== confirmPassword) {
        await toast.error("password must be same as confirm password", toastOptions);
        return false;
     }
     else if (username.length < 3){
       await toast.error("username greater than 3 characters", toastOptions);
       return false;
     }
     else if (password.length < 8 ){
      await toast.error("password must be equal or greater than 8 characters", toastOptions);
      return false;
     }
     else if (email === ""){
      await toast.error("Email is required", toastOptions);
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
          onChange={(e)=> handleChange(e)}/>

          <input type="email" 
          placeholder="Email" 
          name="email" 
          onChange={(e)=> handleChange(e)}/>

          <input type="password" 
          placeholder="Password" 
          name="password" 
          onChange={(e)=> handleChange(e)}/>

          <input type="password" 
          placeholder="Confrim Pasword" 
          name="confirmPassword" 
          onChange={(e)=> handleChange(e)}/>

          <button type="submit">Create User</button>
          <span> already have an account ?  
            <Link to="/login"> Login </Link> </span>
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

export default Register;