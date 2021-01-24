import React     from "react";
import { Redirect, Route }  from "react-router-dom";
import { store } from "../service/store/store";

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        store.getState().auth.authenticated
            ? <Component {...props} />
            : <Redirect to={{
                pathname: '/login',
                previous: props.location
            }} />
    )} />
)