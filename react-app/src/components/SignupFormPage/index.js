import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  // const [country, setCountry] = useState(undefined)
  // const [zipCode, setZipCode] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const data = await dispatch(signUp(firstName, lastName, email, password));
      if (data) {
        setErrors(data);
      }
    } else {
      setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }
  };

  return (
    <div className="body-auth">
      <div className="auth-form__wrapper">
        <form onSubmit={handleSubmit} id="signup-form" className="auth-form">
          <h1 className="auth-form__title">Sign Up</h1>
          <div className="auth-form__input-section">
            <div className="auth-form__input-wrapper">
              <label className="auth-form__input-label" htmlFor="firstName">
                First name
              </label>
              <input
                className="auth-form__input"
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <p className="errors">{errors.first_name}</p>
            </div>
            <div className="auth-form__input-wrapper">
              <label className="auth-form__input-label" htmlFor="lastName">
                Last name
              </label>
              <input
                className="auth-form__input"
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <p className="errors">{errors.last_name}</p>
            </div>
          </div>
          {/* <label>
          Country of Residence
          <select value={country} onChange={(e) => setCountry(e.target.value)}>
            <option value="" disabled selected>Choose country</option>
            <option value="United States">United States</option>
            <option value="Canada">Canada</option>
            <option value="Mexico">Mexico</option>
          </select>
        </label>
        <label>
          Postal Code
          <input
            type="text"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
          />
        </label> */}
          <div className="auth-form__input-section">
            <div className="auth-form__input-wrapper">
              <label className="auth-form__input-label" htmlFor="email">
                Email
              </label>
              <input
                className="auth-form__input"
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className="errors">{errors.email}</p>
            </div>
            <div className="signup-form__email-text-wrapper">
              <p className="signup-form__email-text">You will use your email address to log in</p>
            </div>
          </div>
          <div className="auth-form__input-section">
            <div className="auth-form__input-wrapper">
              <label className="auth-form__input-label" htmlFor="password">
                Password
              </label>
              <input
                className="auth-form__input"
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className="errors">{errors.password}</p>
            </div>
            <div className="auth-form__input-wrapper">
              <label
                className="auth-form__input-label"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                className="auth-form__input"
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <p className="errors">{errors.confirmPassword}</p>
            </div>
          </div>
          <button
            type="submit"
            id="signup-btn"
            className="auth-form__submit-btn"
          >
            Sign Up
          </button>
          <div className="login-form__signup-link">
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupFormPage;
