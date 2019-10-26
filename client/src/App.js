import React from 'react';
import './App.css';
import TablePage from './TablePage.js';
import { Route, Switch } from 'react-router-dom'
import Login from './Login'



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
    window.localStorage.setItem("User", JSON.stringify({email: "", token: ""}));
    setLogged(false);
  }

  return (
     <Switch>
      <Route
      exact
        path='/'
        render={() => (logged? <TablePage logout={HandleLogout}/> : <Login callback={HandleSuccesfulLogin}/>) }
      />
      <Route
        path='/signup'
        render={() => (logged ? <div>Nie weim co</div>: <div>Login??</div>) }
      />
    </Switch>
  )
}

export default App;
