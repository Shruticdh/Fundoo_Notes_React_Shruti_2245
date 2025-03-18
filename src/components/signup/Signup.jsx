import React, { useState } from "react";
import "./Signup.scss";
import Img from "../../assest/gfn4.png";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { signupApiCall } from "../../utils/Api";
import toast from 'react-hot-toast'
// import { useState } from 'react';

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    let valid = true;
    setFirstNameError("");
    setLastNameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;

    if (!firstName.length) {
      setFirstNameError("First name is required");
      valid = false;
    }

    if (!lastName.length) {
      setLastNameError("Last name is required");
      valid = false;
    }

    if (!email.length) {
      setEmailError("Email is required");
      valid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError("Enter valid Email");
      valid = false;
    }

    if (!password.length) {
      setPasswordError("Password is required");
      valid = false;
    } else if (!passwordRegex.test(password)) {
      setPasswordError("conatins 1Uchar,1num,sep char,8char ");
      valid = false;
    }

    if (!confirmPassword.length) {
      setConfirmPasswordError("Confirm password is required");
      valid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      valid = false;
    }

    if (valid) {
      signupApiCall({
        firstName,
        lastName,
        email,
        password,
        service: "advance",
      })
        .then((res) => {
          if (res) {
            console.log("User signed up successfully:", res);
            console.log({
              firstName,
              lastName,
              email,
              password,
              service: "advance",
            });
            alert("Signup successful!");
            toast.success('SignUp Successful');
            navigate("/"); // Login page pe redirect
          } else {
            setEmailError("Email already exists. Try a different email.");
          }
        })
        .catch((err) => {
          console.log("Signup failed:", err);
          alert("Signup failed. Please try again.");
        });
    }
  };

  const handleSignInInstead = () => {
    navigate("/");
  };

  return (
    <div className="fundoo-Signup-Form">
      <div className="fundoo-Signup">
        <div className="fundoo-Signup-header">
          <span class="fundoo">Fundoo</span>
        </div>
        <div className="fundoo-Signup-create">
          <span class="create">Create your Fundo Account</span>
        </div>

        <div className="fundoo-Signup-picture">
          <img src={Img} alt="no image " className="img" />
        </div>

        <div className="fundoo-Signup-firstname">
          <TextField
            id="outlined-basic"
            type="text"
            label="FirstName*"
            variant="outlined"
            onChange={(e) => setFirstName(e.target.value)}
            error={!!firstNameError}
            helperText={firstNameError}
          />
        </div>
        <div className="fundoo-Signup-lastname">
          <TextField
            id="outlined-basic"
            type="text"
            label="LastName*"
            variant="outlined"
            onChange={(e) => setLastName(e.target.value)}
            error={!!lastNameError}
            helperText={lastNameError}
          />
        </div>
        <div className="fundoo-Signup-username">
          <TextField
            id="outlined-basicusername"
            type="email"
            label="Email*"
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
            error={!!emailError}
            helperText={emailError}
          />
        </div>
        <div className="fundoo-Signup-periods">
          <span>You can use letters , numbers & periods</span>
        </div>
        <div className="fundoo-Signup-pc">
          <div className="fundoo-Signup-password">
            <TextField
              id="outlined-basic"
              type="password"
              label="Password*"
              variant="outlined"
              onChange={(e) => setPassword(e.target.value)}
              error={!!passwordError}
              helperText={passwordError}
            />
          </div>
          <div className="fundoo-Signup-confirm">
            <TextField
              id="outlined-basic"
              type="password"
              label="Confirm*"
              variant="outlined"
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={!!confirmPasswordError}
              helperText={confirmPasswordError}
            />
          </div>
        </div>
        <div className="fundoo-Signup-symbols">
          <span>
            Use 8 or more characters with a mix of letters, numbers & symbols
          </span>
        </div>
        <div className="fundoo-Signup-signinButton">
          <Button
            className="instead"
            variant="text"
            onClick={() => handleSignInInstead()}
          >
            Sign in instead
          </Button>
        </div>
        <div className="fundoo-Login-registerButton">
          <Button variant="contained" onClick={() => handleRegister()}>
            Register
          </Button>
        </div>
      </div>
      <div className="fundoo-Signup-footer">
        <div className="fundoo-Signup-help">
          <span>English(United States)</span>
        </div>
        <div className="fundoo-Signup-help">
          <span className="help">Help</span>
        </div>
        <div className="fundoo-Signup-privacy">
          <span className="privacy">Privacy</span>
        </div>
        <div className="fundoo-Signup-terms">
          <span className="terms">Terms</span>
        </div>
      </div>
    </div>
  );
}
