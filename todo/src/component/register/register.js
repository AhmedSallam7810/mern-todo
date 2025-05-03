import React, { useState } from "react";
import "./register.css";
import { useNavigate,Link } from "react-router-dom";
import signupFun from "../../services/signupService";
function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signupError, setSignupError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setSignupError("Passwords do not match");
      return;
    }
    const response = await signupFun({name, email,phone,password});
    const result = await response.json();
    if (result.success) {
      navigate("/login");
    } else {
      setSignupError(result.message);
    }
  };

  return (
    <div className="container register-page">       
      <div className="content-register">
        <h4 className="sign-word">sign up</h4>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            className="input"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            className="input"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            className="input"
            placeholder="phone"
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="password"
            className="input"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            className="input"
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {signupError && (
            <span className="error-message">
              {signupError}
            </span>
          )}
          <input type="submit" className="button" value="sign up" />
        </form>
        <p className="signup-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;