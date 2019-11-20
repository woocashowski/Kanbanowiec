import React, { Component } from "react";
import { FormGroup, FormControl, FormLabel, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./Signup.css";

import Api from "./../../api/api";

export default class Signup extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      pass1: "",
      pass2: "",
      isLoading: false,
      isAfterCreateAccount: false
    };
  }

  isValidateForm() {
    const { email, pass1, pass2 } = this.state;

    if (pass1 !== pass2) {
      return false;
    }

    if (pass1.length === 0 || email.length === 0) {
      return false;
    }

    return true;
  }


  handleSubmit(e) {
    e.preventDefault();
    const { email, pass1, pass2 } = this.state;

    if (pass1 === pass2) {
      this.setState({ isLoading: true });

      Api.TrySignUp(email, pass1)
        .then(res => {
          console.log(res);
          if (res.succeed) {
            this.setState({isAfterCreateAccount: true});
          }
        })
        .catch(err => {
          alert("Error -> " + err);
          console.log(err);
        })
        .then(() => {
          this.setState({ isLoading: false });
        });
    }
  }

  render() {
    return !this.state.isAfterCreateAccount ? (
      <div className="SignupContainer">
        <h3>Sign up to Kanabanowiec</h3>
        <div className="Signup">
          <form onSubmit={this.handleSubmit.bind(this)}>
            <FormGroup controlId="email">
              <FormLabel>Email</FormLabel>
              <FormControl
                autoFocus
                type="email"
                onInput={e => this.setState({ email: e.target.value.trim() })}
              />
            </FormGroup>
            <FormGroup controlId="password">
              <FormLabel>Password</FormLabel>
              <FormControl
                type="password"
                onInput={e => this.setState({ pass1: e.target.value.trim() })}
              />
            </FormGroup>
            <FormGroup controlId="confirmPassword">
              <FormLabel>Confirm Password</FormLabel>
              <FormControl
                type="password"
                onInput={e => this.setState({ pass2: e.target.value.trim() })}
              />
            </FormGroup>
            <Button block type="submit" disabled={!this.isValidateForm()}>
              {this.state.isLoading ? "Loading.." : "Singup"}
            </Button>
          </form>
        </div>
      </div>
    ) : (
      <div className="SignupContainer">
        <p>You successfully created your account!</p>
        <Link to="/kanban">
          <Button block bsSize="large" type="submit">
            Go back to login page
          </Button>
        </Link>
      </div>
    );
  }
}
