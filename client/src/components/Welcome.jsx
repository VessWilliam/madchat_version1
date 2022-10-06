import styled from 'styled-components'
import teddy from '../assets/mocha.gif'
import React from 'react';

export default function Welcome({currentUser}) {
  return (
    <Container>
    <img src={teddy} alt="teddy"/>
    <h2>
        Welcome, <span>{currentUser.username}!</span>
    </h2>
    <h3>Please Select a Chat to Start Message.</h3>
    </Container>
  )
}

const Container =  styled.div`
display: flex;
justify-content: center;
align-items: center;  
flex-direction: column;
color: white;
img{
    height:20rem;
}
span{
    color:#DE1738;
}`;

