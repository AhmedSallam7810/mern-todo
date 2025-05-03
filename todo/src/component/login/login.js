import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import loginFun from "../../services/loginService";
import { useDispatch } from "react-redux";
import { login } from "../../store/action";
function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const submitform = async (e) => {
      e.preventDefault();
  
      try {
        console.log([email, password]);
        const response = await loginFun(email, password);
        const result = await response.json();
  
        if (response.status == 200) {
          setLoginError("");
          dispatch(login(result.token, result.data));
          navigate("/");
        } else {
          setLoginError(result.message);
        }
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div className="container login-page">
      <div className="content-login">
        <h4 className="sign-word">log in</h4>
        <form onSubmit={submitform}>
          <input
            type="email"
            className="input"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="input"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {loginError && (
            <div className="error-message">{loginError}</div>
          )}
          <input type="submit" className="button" value="log in" />
        </form>
        <p className="signup-link">
          Don't have an account? <a href="/register">Sign up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;