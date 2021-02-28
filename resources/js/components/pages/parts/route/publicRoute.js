import React from "react";
import { Redirect, Route } from "react-router-dom";


// Requirement 4.
// It checks if the user is authenticated, if they are,
// it renders the "component" prop. If not, it redirects
// the user to /login.
const PublicRoute = ({component: Component,isLoggedIn, restricted, ...rest}) => {
    return (
        // restricted = false meaning public route
        // restricted = true meaning restricted route
        <Route {...rest} render = {props => (
            isLoggedIn && restricted === true ?
                <Redirect to="/dashboard" />
            : <Component {...props} />
        )} />
    );
};
export default PublicRoute;