import React, { useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./LoginForm.css";

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const demoUser1 = async (e) => {
    e.preventDefault();
    await dispatch(login("demo@aa.io", "password"));
  };

  const demoUser2 = async (e) => {
    e.preventDefault();
    await dispatch(login("marnie@aa.io", "password"));
  };

  return (
    <div className="body">
      <div className="login-form__wrapper">
        <form onSubmit={handleSubmit} className="login-form">
          <h1>Log In</h1>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <p className="errors">{errors.email}</p>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <p className="errors">{errors.password}</p>
          <button className="animal-form__submit-btn" type="submit">Log In</button>
          <div className="demo-user" onClick={demoUser1}>
            Login as Demo User 1
          </div>
          <div className="demo-user" onClick={demoUser2}>
            Login as Demo User 2
          </div>
          <div>Need an account? <Link to='/signup'>Sign up</Link></div>
        </form>
      </div>
    </div>
  );
}

export default LoginFormPage;
