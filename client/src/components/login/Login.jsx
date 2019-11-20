import React, { Component } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { Route, Redirect } from "react-router-dom";
import "./Login.css";
import Api from "./../../api/api";

export default class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      pass: "",
      isLoading: false,
    };
  }

  isValidateForm() {
    const { email, pass } = this.state;

    if (pass.length === 0 || email.length === 0) {
      return false;
    }

    return true;
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ isLoading: true });
    const { email, pass } = this.state;

    Api.TryLogin(email, pass)
      .then(res => {
        console.log(res);
        this.props.setAsLogged(email, res.response.data.token);
      })
      .catch(err => {
        alert("Error -> " + err);
        console.log(err);
      })
      .then(() => this.setState({ isLoading: false}));
  }

  render() {
    return !this.props.isLogged ? (
      <div className="LoginContainer">
        <h3>Sign in to Kanabanowiec</h3>
        <div className="Login">
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
                onInput={e => this.setState({ pass: e.target.value.trim() })}
              />
            </FormGroup>
            <Button block disabled={!this.isValidateForm()} type="submit">
              {this.state.isLoading ? "Loading..." : "Login"}
            </Button>
          </form>
        </div>
        <div className="SignupLink">
          <a href="/signup">Dont have an account?</a>
        </div>
      </div>
    ) : (
        <Route>
            <Redirect
              to={{
                pathname: "/kanban",
              }}
            />
          )
        }
        </Route>
    );
  }
}
