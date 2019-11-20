import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Login from "./components/login/Login.jsx";
import Signup from "./components/signup/Signup.jsx";
import TablePage from "./components/table-page/TablePage.jsx";

import "./App.css";

import Api from "../src/api/api";

function PrivateKanbanRoute({ children, isLogged, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLogged ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      email: undefined,
      isLogged: false,
      token: undefined,
      data: undefined
    };
  }

  setAsLogged(email, token) {
    Api.GetTable(email, token)
      .then(data => {
        console.log(data);
        this.setState({
          email,
          token,
          isLogged: true,
          data: data.response.data
        });
      })
      .catch(er => console.log(er));
  }

  loggout() {
    this.setState({
      email: undefined,
      isLogged: false,
      token: undefined,
      data: undefined
    });
  }

  async changeData(data) {
    const { email, token } = this.state;

    await Api.UpdateTable(email, token, data)
      .then(res => {
        console.log(res);
        this.setState({ data });
      })
      .catch(err => console.log(err));
  }

  updateCardColor(id, color){
    const data = this.state.data;
    data.lanes.forEach(card => {
      const cardTochange = card.cards.find(c => c.id === id);
      console.log(card, id);
      if(cardTochange) {
        console.log('2');
        cardTochange.style = {backgroundColor: color};
        this.changeData(data);
      }
    });
  }

  render() {
    return (
      <Switch>
        <Route exact path="/">
          <Login
            isLogged={this.state.isLogged}
            setAsLogged={this.setAsLogged.bind(this)}
          />
        </Route>
        <PrivateKanbanRoute isLogged={this.state.isLogged} path="/kanban">
          <TablePage
            email={this.state.email}
            changeData={this.changeData.bind(this)}
            updateCardColor={this.updateCardColor.bind(this)}
            loggout={this.loggout.bind(this)}
            data={this.state.data}
          />
        </PrivateKanbanRoute>
        <Route path="/signup">
          <Signup />
        </Route>
      </Switch>
    );
  }
}
