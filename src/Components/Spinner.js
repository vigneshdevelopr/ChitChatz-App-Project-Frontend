import React from 'react'
import styled from 'styled-components';

function Loading() {
  return (
    <>
    {/* <Heading>
Dear Users, Please wait a moment to get started server. <span style={{fontStyle:'italic',color:'yellow',backgroundColor:'black',fontWeight:'500',width:'fit-content',padding:'0.5rem'}}>Because i hosted the server by Free plan.</span> It goes shutdown When the site is inactive. It takes time to Cold Start the Server upto 30 to 40 Seconds. Thanks for your patience.
  </Heading> */}
    <Divison>
    <SpinnerContainer>
    <Spinner />
  </SpinnerContainer>
  

    </Divison>
    </>

  )
}

export default Loading

const Heading = styled.div`
font-size: x-large;
display: flex;
flex-direction: column !important;

`
const Divison = styled.h3`
display: flex;
justify-content: center;
align-items: center;
`

const SpinnerContainer = styled.div`
margin-top: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* height: 100vh; */
`;

const Spinner = styled.div`
  border: 5px solid rgba(0, 0, 0, 0.1);
  border-top: 5px solid #fff;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;


