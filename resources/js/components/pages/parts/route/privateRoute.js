import React from "react";
import { Redirect, Route } from "react-router-dom";

// Requirement 3.
// It checks if the user is authenticated, if they are,
// it renders the "component" prop. If not, it redirects
// the user to /login.
const PrivateRoute = ({component: Component,isLoggedIn, ...rest}) => {
    return (
        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /login page
        <Route {...rest}  render = {props => (
            isLoggedIn === true ?
                <Component {...props} />
            : <Redirect to="/login" />
        )} />
    );
};

export default PrivateRoute;
