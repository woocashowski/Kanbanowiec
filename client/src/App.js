import React from 'react';
import './App.css';
import TablePage from './TablePage.js';
import { Route, Switch } from 'react-router-dom'
import Login from './Login'
import Signup from './Signup'
import {Verify} from './api';

function GetUser() {
  if (window.localStorage.User) {
    let user = JSON.parse(window.localStorage.User);
    if (user.email !== "" && user.token !== "") {
      return user;
    }
  }
  return null;

}

async function IsLogged() {
  let user = GetUser();
  if (user) {
    let resp  = await Verify(user.email, user.token);
    if(resp.succeed) {
      return true;
    }
    else {
      return false;
    }
  }
  return false;
}

// function requireAuth(nextState, replace) {
//   if (!loggedIn()) {
//     replace({
//       pathname: '/login'
//     })
//   }
// }
function App() {
  const [logged, setLogged] = React.useState(false);

  function HandleSuccesfulLogin() {
    setLogged(true);
  }
  function HandleLogout() {
    window.localStorage.setItem("User", JSON.stringify({ email: "", token: "" }));
    setLogged(false);
  }

  React.useEffect( () => {
    async function DoStuff() {
      setLogged( await IsLogged() );
    }
    DoStuff();
  } , [setLogged] );

  return (
    <Switch>
      <Route
        exact
        path='/'
        render={() => (logged ? <TablePage logout={HandleLogout} /> : <Login callback={HandleSuccesfulLogin} />)}
      />
      <Route
        path='/signup'
        render={() => (logged ? <div>WTF Wynoś się</div> : <Signup />)}
      />
    </Switch>
  )
}

export default App;
