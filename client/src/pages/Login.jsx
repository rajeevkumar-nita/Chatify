
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import styled from "styled-components";
// import { useNavigate, Link } from "react-router-dom";
// import Logo from "../assets/logo.svg";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { loginRoute } from "../utils/APIRoutes";


// export default function Login() {
//   const navigate = useNavigate();
//   const [credentials, setCredentials] = useState({ username: "", password: "" });
//   const toastConfig = {
//     position: "bottom-right",
//     autoClose: 8000,
//     pauseOnHover: true,
//     draggable: true,
//     theme: "light",
//   };

//   useEffect(() => {
//     if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
//       navigate("/");
//     }
//   }, [navigate]);

//   const handleInputChange = (event) => {
//     setCredentials({ ...credentials, [event.target.name]: event.target.value });
//   };

//   const validateForm = () => {
//     const { username, password } = credentials;
//     if (username === "" || password === "") {
//       toast.error("Username and Password are required.", toastConfig);
//       return false;
//     }
//     return true;
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (validateForm()) {
//       const { username, password } = credentials;
//       const { data } = await axios.post(loginRoute, { username, password });
//       if (data.status === false) {
//         toast.error(data.msg, toastConfig);
//       } else {
//         localStorage.setItem(
//           process.env.REACT_APP_LOCALHOST_KEY,
//           JSON.stringify(data.user)
//         );
//         navigate("/");
//       }
//     }
//   };

//   return (
//     <>
//       <Container>
//         <Form onSubmit={handleSubmit}>
//           <Brand>
//             <img src={Logo} alt="logo" />
//             <h1>Chatify</h1>
//           </Brand>
//           <Input
//             type="text"
//             placeholder="Username"
//             name="username"
//             onChange={handleInputChange}
//           />
//           <Input
//             type="password"
//             placeholder="Password"
//             name="password"
//             onChange={handleInputChange}
//           />
//           <Button type="submit">Log In</Button>
//           <Text>
//             Don't have an account? <StyledLink to="/register">Create One</StyledLink>
//           </Text>
//         </Form>
//       </Container>
//       <ToastContainer />
//     </>
//   );
// }

// const Container = styled.div`
//   height: 100vh;
//   width: 100vw;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//    align-items: center;
  
//   background-size: cover;
// `;

// const Form = styled.form`
//   display: flex;
//   flex-direction: column;
//   gap: 1.5rem;
//   background-color: rgba(255, 255, 255, 0.9);
//   border: 2px solid #ddd;
//   border-radius: 1rem;
//   padding: 4rem;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
// `;

// const Brand = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 1rem;
//   justify-content: center;
//   img {
//     height: 4rem;
//   }
//   h1 {
//     color: #333;
//     text-transform: uppercase;
//     font-family: "Arial", sans-serif;
//   }
// `;

// const Input = styled.input`
//   background-color: #f9f9f9;
//   padding: 1rem;
//   border: 1px solid #ccc;
//   border-radius: 0.3rem;
//   width: 100%;
//   font-size: 1rem;
//   color: #333;
//   &:focus {
//     border-color: #007bff;
//     outline: none;
//   }
// `;

// const Button = styled.button`
//   background-color: #007bff;
//   color: #fff;
//   padding: 1rem 2rem;
//   border: none;
//   font-weight: bold;
//   cursor: pointer;
//   border-radius: 0.3rem;
//   font-size: 1rem;
//   text-transform: uppercase;
//   transition: background-color 0.3s ease;
//   &:hover {
//     background-color: #0056b3;
//   }
// `;

// const Text = styled.span`
//   color: #333;
//   text-transform: none;
//   font-size: 0.9rem;
// `;

// const StyledLink = styled(Link)`
//   color: #007bff;
//   text-decoration: none;
//   font-weight: bold;
// `;







import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/APIRoutes";

export default function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: "", password: "" });

  const toastConfig = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, [navigate]);

  const handleInputChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { username, password } = credentials;
    if (username === "" || password === "") {
      toast.error("Username and Password are required.", toastConfig);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { username, password } = credentials;
      try {
        const { data } = await axios.post(loginRoute, { username, password });
        if (data.status === false) {
          toast.error(data.msg, toastConfig);
        } else {
          localStorage.setItem(
            process.env.REACT_APP_LOCALHOST_KEY,
            JSON.stringify(data.user)
          );
          navigate("/");
        }
      } catch (err) {
        toast.error("Something went wrong. Please try again.", toastConfig);
      }
    }
  };

  return (
    <>
      <Container>
        <Form onSubmit={handleSubmit}>
          <Brand>
            <img src={Logo} alt="logo" />
            <h1>Chatify</h1>
          </Brand>
          <Input
            type="text"
            placeholder="Username"
            name="username"
            onChange={handleInputChange}
          />
          <Input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleInputChange}
          />
          <Button type="submit">Log In</Button>
          <Text>
            Don't have an account?{" "}
            <StyledLink to="/register">Create One</StyledLink>
          </Text>
        </Form>
      </Container>
      <ToastContainer />
    </>
  );
}

// Styled Components

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background: linear-gradient(145deg, #f5f7fa, #c3cfe2);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

const Form = styled.form`
  background: #fff;
  padding: 3rem 2.5rem;
  border-radius: 1rem;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  @media screen and (max-width: 480px) {
    padding: 2rem 1.5rem;
    gap: 1rem;
  }
`;

const Brand = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;

  img {
    height: 3.5rem;
  }

  h1 {
    font-size: 1.8rem;
    font-weight: bold;
    text-transform: uppercase;
    color: #4e0eff;
    letter-spacing: 1px;
  }
`;

const Input = styled.input`
  padding: 0.9rem 1rem;
  border: 1px solid #ccc;
  border-radius: 0.4rem;
  font-size: 1rem;
  transition: all 0.3s ease;
  color: #333;

  &:focus {
    outline: none;
    border-color: #4e0eff;
    box-shadow: 0 0 0 2px rgba(78, 14, 255, 0.1);
  }
`;

const Button = styled.button`
  padding: 0.9rem;
  border: none;
  border-radius: 0.4rem;
  background-color: #4e0eff;
  color: #fff;
  font-weight: bold;
  font-size: 1rem;
  text-transform: uppercase;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #3c00d8;
  }
`;

const Text = styled.span`
  font-size: 0.9rem;
  color: #555;
  text-align: center;
`;

const StyledLink = styled(Link)`
  color: #4e0eff;
  text-decoration: none;
  margin-left: 5px;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;
