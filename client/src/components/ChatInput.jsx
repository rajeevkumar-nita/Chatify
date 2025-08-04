import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";
import Picker from "emoji-picker-react";

export default function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (event, emojiObject) => {
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
        </div>
      </div>
      <form className="input-container" onSubmit={(event) => sendChat(event)}>
        <input
          type="text"
          placeholder="type your message here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button type="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5% 95%;
  background-color: #080420;
  padding: 0 2rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }
      .emoji-picker-react {
        position: absolute;
        top: -350px;
        background-color: #080420;
        box-shadow: 0 5px 10px #9a86f3;
        border-color: #9a86f3;
        .emoji-scroll-wrapper::-webkit-scrollbar {
          background-color: #080420;
          width: 5px;
          &-thumb {
            background-color: #9a86f3;
          }
        }
        .emoji-categories {
          button {
            filter: contrast(0);
          }
        }
        .emoji-search {
          background-color: transparent;
          border-color: #9a86f3;
        }
        .emoji-group:before {
          background-color: #080420;
        }
      }
    }
  }
  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;

      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: none;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }
      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
`;












// import React, { useState } from "react";
// import { BsEmojiSmileFill } from "react-icons/bs";
// import { IoMdSend } from "react-icons/io";
// import styled from "styled-components";
// import Picker from "emoji-picker-react";

// export default function ChatInput({ handleSendMsg }) {
//   const [msg, setMsg] = useState("");
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);

//   const handleEmojiPickerhideShow = () => {
//     setShowEmojiPicker(!showEmojiPicker);
//   };

//   const handleEmojiClick = (event, emojiObject) => {
//     let message = msg;
//     message += emojiObject.emoji;
//     setMsg(message);
//   };

//   const sendChat = (event) => {
//     event.preventDefault();
//     if (msg.length > 0) {
//       handleSendMsg(msg);
//       setMsg("");
//     }
//   };

//   return (
//     <Container>
//       <div className="emoji-section">
//         <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
//         {showEmojiPicker && (
//           <div className="emoji-picker">
//             <Picker onEmojiClick={handleEmojiClick} />
//           </div>
//         )}
//       </div>

//       <form className="input-section" onSubmit={sendChat}>
//         <input
//           type="text"
//           placeholder="Type a message..."
//           value={msg}
//           onChange={(e) => setMsg(e.target.value)}
//         />
//         <button type="submit">
//           <IoMdSend />
//         </button>
//       </form>
//     </Container>
//   );
// }

// const Container = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 1rem;
//   background-color: #080420;
//   padding: 0.8rem 1.5rem;
//   border-top: 1px solid #2e2e4d;

//   .emoji-section {
//     position: relative;
//     display: flex;
//     align-items: center;
//     svg {
//       color: #ffff00c8;
//       font-size: 1.7rem;
//       cursor: pointer;
//       transition: transform 0.2s ease;
//     }

//     .emoji-picker {
//       position: absolute;
//       bottom: 3.5rem;
//       z-index: 10;
//       box-shadow: 0 5px 15px rgba(154, 134, 243, 0.5);
//       .emoji-picker-react {
//         background-color: #080420;
//         border-color: #9a86f3;
//       }
//     }
//   }

//   .input-section {
//     flex: 1;
//     display: flex;
//     align-items: center;
//     background-color: #ffffff34;
//     border-radius: 2rem;
//     padding: 0.5rem 1rem;

//     input {
//       flex: 1;
//       border: none;
//       background: transparent;
//       color: white;
//       font-size: 1rem;
//       padding: 0.4rem;

//       &::placeholder {
//         color: #cfcfcf;
//       }

//       &:focus {
//         outline: none;
//       }
//     }

//     button {
//       background-color: #9a86f3;
//       border: none;
//       border-radius: 50%;
//       padding: 0.6rem;
//       margin-left: 0.5rem;
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       cursor: pointer;
//       transition: background-color 0.3s ease;

//       svg {
//         color: white;
//         font-size: 1.5rem;
//       }

//       &:hover {
//         background-color: #7a5af5;
//       }
//     }
//   }

//   @media screen and (max-width: 768px) {
//     flex-direction: column;
//     gap: 0.5rem;
//     padding: 0.5rem 1rem;

//     .input-section {
//       width: 100%;
//       input {
//         font-size: 0.95rem;
//       }

//       button {
//         padding: 0.5rem;
//         svg {
//           font-size: 1.3rem;
//         }
//       }
//     }
//   }
// `;
