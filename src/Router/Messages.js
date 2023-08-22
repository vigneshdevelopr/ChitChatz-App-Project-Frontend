import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { FriendsRoute, url } from '../utils/Routes';
import AllFriends from '../Components/Friends';
import Welcome from '../Components/welcome';
import ChatBox from '../Components/ChatBox';
import { io } from 'socket.io-client';



const Messages = () => {
  const socket = useRef();


   socket.current = io(url, {
    withCredentials: true,
    transports: ['websocket', 'polling'],
    upgrade: false,
    extraHeaders: {
      'my-custom-header': 'abcd'
    }
  });
  const history = useHistory();
  const [Friends, setFriends] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function fetchedData() {
      const data = await JSON.parse(localStorage.getItem('ChitChatz-user'));
      if (!data) {
        history.push('/');
      } else {
        setCurrentUser(data);
        setLoaded(true);
      }
    }
    fetchedData();
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current.on('connection-successful',(data)=>{
        console.log('received data from connection',data);
      })
      socket.current.emit('add-user', currentUser._id);

      return () => {
        if (socket.current) {
          socket.current.disconnect();
        }
      };
    }
  }, [currentUser]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${FriendsRoute}/${currentUser._id}`);
        setFriends(response.data);
      } catch (error) {
        console.log('Error fetching friends:', error);
      }
    }
    if (currentUser) {
      fetchData();
    }
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <div id="message-sec">
      <div className="page">
        <AllFriends Friends={Friends} currentUser={currentUser} changeChat={handleChatChange} />
        {loaded && currentChat === undefined ? (
          <Welcome currentUser={currentUser} />
        ) : (
          <ChatBox currentChat={currentChat} currentUser={currentUser} socket={socket} />
        )}
      </div>
    </div>
  );
};

export default Messages;
