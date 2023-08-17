import React, { useEffect, useState,useRef } from 'react'
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { FriendsRoute } from '../utils/Routes';
import AllFriends from '../Components/Friends';
import Welcome from '../Components/welcome';
import ChatBox from '../Components/ChatBox';
import {io}from 'socket.io-client'


function Messages() {
  const history = useHistory();
  const socket = useRef();
  const[Friends, setFriends] = useState([])
  const[currentUser, setCurrentUser] = useState(undefined)
  const[currentChat, setCurrentChat]= useState(undefined)
  const[loaded, setLoaded] = useState(false)
  useEffect(()=>{
    async function fetchedData(){
      
         const data = await JSON.parse(localStorage.getItem('ChitChatz-user'));
         if(!data){
          history.push('/')
         }else{
          setCurrentUser(data);
          setLoaded(true)
         }
         
        
    }
    fetchedData();

  },[])

useEffect(()=>{
  if(currentUser){
    socket.current = io('https://chatappserver.vercel.app',{
      withCredentials: true,
      extraHeaders: {
        "my-custom-header": "abcd"
      }
    })
    socket.current.emit("add-user", currentUser._id)
 }
},[currentUser])



  useEffect(() => {
    async function fetchData() {
      if (currentUser) {
        try {
          const data = await axios.get(`${FriendsRoute}/${currentUser._id}`)
          // const response = await fetch(`${FriendsRoute}/${currentUser._id}`,{
          //   method:'GET',
          //   body:JSON.stringify(),
          //   headers:{
          //     'content-type':'application/json'
          //   }
          // })
          // const data = await response.json()
          console.log(currentUser._id);
          setFriends(data.data)
        } catch (error) {
          console.log(error);
        }
      }
    }
    fetchData();
  }, [currentUser]);


const handleChatChange= (chat)=>{
setCurrentChat(chat);
}




  return (
    <div id='message-sec'>
<div className='page'>
  <AllFriends Friends={Friends} currentUser={currentUser} changeChat={handleChatChange} />
{loaded && currentChat===undefined?   (<Welcome currentUser={currentUser}  />): (<ChatBox currentChat={currentChat} currentUser={currentUser} socket={socket}/>)
}

</div>
    </div>
    
  )
}


export default Messages