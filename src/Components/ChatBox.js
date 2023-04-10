import { React, useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Signout from "./Signout";
import Input from "../Router/Input";
import axios from "axios";
import { AddMessageRoute, GetMessageRoute } from "../utils/Routes";
import { v4 as uuidv4 } from "uuid";

function ChatBox({ currentChat, currentUser, socket }) {
  const [allmsg, setAllmsg] = useState([]);
  const [msgArrived, setMessageArrived] = useState(null);
  const scrollRef = useRef();
  useEffect(() => {
    if (currentChat) {
      async function fetchData() {
        const response = await axios.post(GetMessageRoute, {
          from: currentUser._id,
          to: currentChat._id,
        });
        setAllmsg(response.data);
      }
      fetchData();
    }
  }, [currentChat]);

  useEffect(() => {
    const getCurrentChat = async () => {
      if (currentChat) {
        await JSON.parse(localStorage.getItem("ChitChatz-user"))._id;
      }
    };
    getCurrentChat();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    const data = await JSON.parse(localStorage.getItem("ChitChatz-user"));
    await axios.post(AddMessageRoute, {
      from: data._id,
      to: currentChat._id,
      message: msg,
    });
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: data._id,
      msg,
    });

    const msgs = [...allmsg];
    msgs.push({ fromSelf: true, message: msg });
    setAllmsg(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (message) => {
        setMessageArrived({ fromSelf: false, message: message });
      });
    }
  }, []);

  useEffect(() => {
    msgArrived && setAllmsg((prev) => [...prev, msgArrived]);
  }, [msgArrived]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [allmsg]);

  return (
    <>
      {currentChat && (
        <Container>
          <div className="chat-header">
            <div className="user-details">
              <div className="avatar">
                <img src={currentChat.avatarImage} />
              </div>
              <div className="firstName">
                <h3>{currentChat.firstName}</h3>
              </div>
            </div>
            <Signout />
          </div>
          <div className="chat-messages">
            {allmsg.map((message) => {
              return (
                <div ref={scrollRef} key={uuidv4()}>
                  <div
                    className={`message ${
                      message.fromSelf ? "sended" : "received"
                    }`}
                  >
                    <div className="content ">
                      <p>{message.message}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <Input handleSendMsg={handleSendMsg} />
        </Container>
      )}
    </>
  );
}

export default ChatBox;

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: black;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: black;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }
`;
