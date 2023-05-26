import React, { useContext, useState } from "react";
import styled from "./styled";
import { IAuthContext, TUser } from "../../contexts/types";
import { AuthContext } from "../../contexts/AuthContext";

const LoginForm: React.FC = () => {
  const { setUser } = useContext<IAuthContext>(AuthContext);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);

    // Chiamata API
    // Se OK setUser diverso da null
    // Se false resituisco credenziali errate
  };
  return (
    <styled.LoginForm onSubmit={handleLogin}>
      <h1>Chatly</h1>
      <input
        onChange={(e) =>
          setFormData((prev) => {
            return {
              ...prev,
              username: e.target.value,
            };
          })
        }
        placeholder="username"
      />
      <input
        placeholder="password"
        type="password"
        onChange={(e) =>
          setFormData((prev) => {
            return { ...prev, password: e.target.value };
          })
        }
      />
      <button>Login</button>
    </styled.LoginForm>
  );
};

export default LoginForm;
