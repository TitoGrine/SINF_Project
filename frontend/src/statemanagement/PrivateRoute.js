import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "./AuthenticationContext";

/**
 * A Route that redirects to the login page  
 */
function PrivateRoute({ children, ...rest }) {
  const { authTokens } = useAuth();

  return (
    <Route
      {...rest}
      render={() => (authTokens ? children : <Redirect to="/login" />)}
    ></Route>
  );
}

export default PrivateRoute;
