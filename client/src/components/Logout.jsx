// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { BiPowerOff } from "react-icons/bi";
// import styled from "styled-components";
// import axios from "axios";
// import { logoutRoute } from "../utils/APIRoutes";
// export default function Logout() {
//   const navigate = useNavigate();


//   const handleClick = async () => {
//     const id = await JSON.parse(
//       localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
//     )._id;
//     const data = await axios.get(`${logoutRoute}/${id}`);
//     if (data.status === 200) {
//       localStorage.clear();
//       navigate("/login");
//     }
//   };
  
//   return (
//     <Button onClick={handleClick}>
//       <BiPowerOff />
//     </Button>
//   );
// }

// const Button = styled.button`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   padding: 0.5rem;
//   border-radius: 0.5rem;
//   background-color: #9a86f3;
//   border: none;
//   cursor: pointer;
//   svg {
//     font-size: 1.3rem;
//     color: #ebe7ff;
//   }
// `;







import React from "react";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import styled from "styled-components";
import axios from "axios";
import { logoutRoute } from "../utils/APIRoutes";

export default function Logout() {
  const navigate = useNavigate();

  const handleClick = async () => {
    const user = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
    if (!user?._id) return;

    try {
      const response = await axios.get(`${logoutRoute}/${user._id}`);
      if (response.status === 200) {
        localStorage.clear();
        navigate("/login");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Button onClick={handleClick} title="Logout">
      <BiPowerOff />
    </Button>
  );
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.6rem;
  border-radius: 0.6rem;
  background-color: #9a86f3;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);

  svg {
    font-size: 1.4rem;
    color: #ebe7ff;
  }

  &:hover {
    background-color: #7c6ad9;
    transform: scale(1.05);
  }

  @media screen and (max-width: 768px) {
    padding: 0.5rem;
    svg {
      font-size: 1.2rem;
    }
  }
`;
