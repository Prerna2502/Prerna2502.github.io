import React from "react";
import {BrowserRouter as Router} from 'react-router-dom';
import {Home, Browse, Signin, Signup} from "./pages";
import * as ROUTES from './constants/routes';
import { IsUserRedirect, ProtectedRoute } from './helpers/routes';
import {useAuthListener} from './hooks'

function App() {

  const {user} = useAuthListener();

  return (
    <div className="App">
      <Router>
        <IsUserRedirect user={user} loggedInPath={ROUTES.BROWSE} path = {ROUTES.SIGN_IN} exact>
          <Signin/>
        </IsUserRedirect>
        <IsUserRedirect user={user} loggedInPath={ROUTES.BROWSE} exact path = {ROUTES.SIGN_UP}>
          <Signup/>
        </IsUserRedirect>
        <ProtectedRoute user={user} path={ROUTES.BROWSE} exact>
          <Browse/>
        </ProtectedRoute>
        <IsUserRedirect user={user} loggedInPath={ROUTES.BROWSE} path = {ROUTES.HOME} exact>
          <Home/>
        </IsUserRedirect>
      </Router>
    </div>
  );
}

export default App;
