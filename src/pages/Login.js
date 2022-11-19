import React, { useState } from "react";
import styled from "styled-components";

import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../config/firebase";
import { useNavigate } from "react-router-dom";

import axiosInstance from "../api/axios";
import { ERROR } from "../constants/error";

export default function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const {
        user: {
          displayName,
          reloadUserInfo: { localId },
        },
      } = await signInWithPopup(auth, provider);

      const { status } = await axiosInstance.post("/login", {
        username: displayName,
        googleId: localId,
      });

      console.log(status);

      status === 200 ? navigate("/") : setErrorMessage(ERROR.FAIL_LOGIN);
    } catch (error) {
      setErrorMessage(ERROR.FAIL_LOGIN);
    }
  };

  return (
    <LoginButtonWrapper>
      <LoginButton onClick={handleLogin}>Login</LoginButton>
      <div>{errorMessage}</div>
    </LoginButtonWrapper>
  );
}

const LoginButton = styled.button`
  width: 300px;
  height: 200px;
  font-size: 30px;
`;

const LoginButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;
