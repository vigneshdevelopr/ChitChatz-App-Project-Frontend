import React from 'react'
import styled from 'styled-components'
import chatting from '../assets/chatting.gif'


function Welcome({currentUser}) {
  return (
    <>
    <Container>
    <img  src={chatting} />
    <div style={{textAlign:'center'}}>
<h1>Welcome, <span>{currentUser.firstName}</span>!</h1>
<h3>Select Your Friend and Start ChitChat</h3>
</div>
    </Container>
    </>
  )
}


const Container = styled.div`
display: flex;
  justify-content: center;
  align-items: center;
  color: #252525;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }

`
export default Welcome