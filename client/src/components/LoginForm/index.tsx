import React, { useState } from "react";
import styled from "./styled";
import { useAuthContext } from "../../contexts/AuthContext";
import { useAsyncFn } from "../../utils/hooks/useAsync";
import { loginUser } from "../../services/api/User/loginUser";
import { createUser } from "../../services/api/User/createUser";
import { useNavigate } from "react-router-dom";

interface IFormData {
  username: string;
  password: string;
  isLogin: boolean;
  name?: string;
  lastName?: string;
}

const LoginForm: React.FC = () => {
  const { setUser } = useAuthContext();
  const [formData, setFormData] = useState<IFormData>({
    username: "",
    lastName: "",
    name: "",
    password: "",
    isLogin: true,
  });
  const [error, setError] = useState("");
  const { execute: createUserFn } = useAsyncFn(createUser);
  const { execute: loginUserFn } = useAsyncFn(loginUser);

  const navigate = useNavigate();

  /**
   * Handles the login & sign up
   * @param e
   */
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { username, name, lastName, password, isLogin } = formData;

    if (isLogin) {
      const response = await loginUserFn(username, password);

      switch (response.status) {
        case 200:
          setUser(response.data.user);
          localStorage.setItem("token", response.data.token);

          setFormData({ username: "", password: "", isLogin: true });
          navigate("/");
          break;
        case 404:
          setError("User does not exist. Please sign up.");
          break;
        case 401:
          setError("Wrong credentials");
          break;

        default:
          setError("An error occurred");
          break;
      }
    } else {
      const response = await createUserFn(name, lastName, username, password);

      switch (response.status) {
        case 200:
          setFormData({ username: "", password: "", isLogin: true });
          setUser(response.data.user);
          localStorage.setItem("token", response.data.token);

          navigate("/");
          break;
        case 400:
          setError(response.details);
          break;

        default:
          setError("An Unknown error occurred");
          break;
      }
    }
  };
  return (
    <styled.LoginForm onSubmit={handleLogin}>
      <h1>Chatly</h1>
      {!formData.isLogin && (
        <>
          <input
            onFocus={() => setError("")}
            onChange={(e) =>
              setFormData((prev) => {
                return {
                  ...prev,
                  name: e.target.value,
                };
              })
            }
            value={formData.name}
            placeholder="name"
          />
          <input
            onFocus={() => setError("")}
            onChange={(e) =>
              setFormData((prev) => {
                return {
                  ...prev,
                  lastName: e.target.value,
                };
              })
            }
            value={formData.lastName}
            placeholder="Last name"
            autoComplete="Last Name"
          />
        </>
      )}
      <input
        onFocus={() => setError("")}
        onChange={(e) =>
          setFormData((prev) => {
            return {
              ...prev,
              username: e.target.value,
            };
          })
        }
        value={formData.username}
        autoComplete="username"
        placeholder="username"
      />
      <input
        onFocus={() => setError("")}
        autoComplete="current-password"
        placeholder="password"
        type="password"
        value={formData.password}
        onChange={(e) =>
          setFormData((prev) => {
            return { ...prev, password: e.target.value };
          })
        }
      />

      <a
        href="#"
        onClick={() => {
          setError("");
          setFormData((prev) => {
            return { ...prev, isLogin: !prev.isLogin };
          });
        }}
      >
        {formData.isLogin
          ? "Don't have an account? Sign Up "
          : "Go to the login"}
      </a>
      {error && <p>{error}</p>}
      <button disabled={!formData.password || !formData.username}>
        {formData.isLogin ? "Login " : "Sign Up"}
      </button>
    </styled.LoginForm>
  );
};

export default LoginForm;
