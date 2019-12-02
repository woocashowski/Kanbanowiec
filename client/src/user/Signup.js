import React, { useState } from "react";
import {
  FormGroup,
  FormControl,
  FormLabel,
  Button
} from "react-bootstrap";
import "./Signup.css";
import Api from './../api/api';

export default function Signup(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signed, setSigned] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return (
      email.length > 0 &&
      password.length > 0 &&
      password === confirmPassword
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    const resp = await Api.TrySignUp(email, password);
    console.log(resp);
    if (resp.succeed) {
      setSigned(true);
    }
    else {
      alert("Username is taken!");
    }
    setIsLoading(false);
  }
  function renderSuccessfulSignup() {
    return (
      <div>
        <p>You successfully created your account!</p>
        <form action="/">
          <Button block bsSize="large" type="submit" >
            Go back to login page
            </Button>
        </form>
      </div>
    );
  }

  function renderForm() {
    return (
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="email" bsSize="large">
          <FormLabel>Email</FormLabel>
          <FormControl
            autoFocus
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <FormLabel>Password</FormLabel>
          <FormControl
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="confirmPassword" bsSize="large">
          <FormLabel>Confirm Password</FormLabel>
          <FormControl
            type="password"
            onChange={e => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
        </FormGroup>
        <Button
          block
          type="submit"
          disabled={!validateForm()}
        >
          {isLoading ? "Fetching..." : "Signup"}
        </Button>
      </form>
    );
  }

  return (
    <div className="Signup">
      {signed ? renderSuccessfulSignup() : renderForm()}
    </div>
  );
}