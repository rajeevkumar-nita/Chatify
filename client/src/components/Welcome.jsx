// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import Robot from "../assets/robot.gif";
// export default function Welcome() {
//   const [userName, setUserName] = useState("");
//   useEffect(async () => {
//     setUserName(
//       await JSON.parse(
//         localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
//       ).username
//     );
//   }, []);
//   return (
//     <Container>
//       <img src={Robot} alt="" />
//       <h1>
//         Welcome, <span>{userName}!</span>
//       </h1>
//       <h3>Please select a chat to Start messaging.</h3>
//     </Container>
//   );
// }

// const Container = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   color: white;
//   flex-direction: column;
//   img {
//     height: 20rem;
//   }
//   span {
//     color: #4e0eff;
//   }
// `;






import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";

export default function Welcome() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    async function loadUser() {
      const data = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );
      setUserName(data.username);
    }
    loadUser();
  }, []);

  return (
    <Container>
      <img src={Robot} alt="Welcome Bot" />
      <h1>
        Welcome, <span>{userName}!</span>
      </h1>
      <h3>Please select a chat to start messaging.</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  padding: 2rem;
  height: 100%;

  img {
    height: 20rem;
    margin-bottom: 2rem;
    @media screen and (max-width: 768px) {
      height: 12rem;
    }
  }

  h1 {
    font-size: 2rem;
    margin-bottom: 1rem;

    span {
      color: #4e0eff;
    }

    @media screen and (max-width: 768px) {
      font-size: 1.5rem;
    }
  }

  h3 {
    font-weight: 400;
    color: #ccc;
    @media screen and (max-width: 768px) {
      font-size: 1rem;
    }
  }
`;
