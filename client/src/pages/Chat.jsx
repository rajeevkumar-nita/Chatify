import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import { allUsersRoute, host } from "../utils/APIRoutes";
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
//defaault

export default function Chat() {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(async () => {
    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/login");
    } else {
      setCurrentUser(
        await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        )
      );
    }
  }, []);
  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(async () => {
    if (currentUser) {
      if (currentUser.isAvatarImageSet) {
        const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
        setContacts(data.data);
      } else {
        navigate("/setAvatar");
      }
    }
  }, [currentUser]);
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  return (
    <>
      <Container>
        <div className="container">
          <Contacts contacts={contacts} changeChat={handleChatChange} />
          {currentChat === undefined ? (
            <Welcome />
          ) : (
            <ChatContainer currentChat={currentChat} socket={socket} />
          )}
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;










// // src/pages/Chat.jsx
// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { io } from "socket.io-client";
// import styled from "styled-components";
// import { allUsersRoute, host } from "../utils/APIRoutes";
// import ChatContainer from "../components/ChatContainer";
// import Contacts from "../components/Contacts";
// import Welcome from "../components/Welcome";

// export default function Chat() {
//   const navigate = useNavigate();
//   const socket = useRef();
//   const [contacts, setContacts] = useState([]);
//   const [currentChat, setCurrentChat] = useState(undefined);
//   const [currentUser, setCurrentUser] = useState(undefined);

//   useEffect(() => {
//     async function init() {
//       if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
//         navigate("/login");
//       } else {
//         setCurrentUser(
//           await JSON.parse(
//             localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
//           )
//         );
//       }
//     }
//     init();
//   }, [navigate]);

//   useEffect(() => {
//     if (currentUser) {
//       socket.current = io(host);
//       socket.current.emit("add-user", currentUser._id);
//     }
//   }, [currentUser]);

//   useEffect(() => {
//     async function fetchContacts() {
//       if (currentUser) {
//         if (currentUser.isAvatarImageSet) {
//           const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
//           setContacts(data.data);
//         } else {
//           navigate("/setAvatar");
//         }
//       }
//     }
//     fetchContacts();
//   }, [currentUser, navigate]);

//   const handleChatChange = (chat) => {
//     setCurrentChat(chat);
//   };

//   return (
//     <Container>
//       <div className="main-container">
//         <div className="contacts-panel">
//           <Contacts contacts={contacts} changeChat={handleChatChange} />
//         </div>
//         <div className="chat-panel">
//           {currentChat === undefined ? (
//             <Welcome />
//           ) : (
//             <ChatContainer currentChat={currentChat} socket={socket} />
//           )}
//         </div>
//       </div>
//     </Container>
//   );
// }

// const Container = styled.div`
//   height: 100vh;
//   width: 100vw;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   background-color: #131324;

//   .main-container {
//     height: 90vh;
//     width: 90vw;
//     display: grid;
//     grid-template-columns: 25% 75%;
//     background-color: #00000076;
//     border-radius: 1rem;
//     overflow: hidden;

//     @media screen and (max-width: 768px) {
//       grid-template-columns: 100%;
//       grid-template-rows: 1fr 1fr;
//     }
//   }

//   .contacts-panel {
//     border-right: 1px solid rgba(255, 255, 255, 0.1);
//     overflow-y: auto;
//     background-color: #1e1e2f;
//     @media screen and (max-width: 768px) {
//       border-right: none;
//       border-bottom: 1px solid rgba(255, 255, 255, 0.1);
//     }
//   }

//   .chat-panel {
//     overflow-y: auto;
//     background-color: #0d0d30;
//   }
// `;
