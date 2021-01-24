import React, { useState } from "react";
import Form                from "react-bootstrap/Form";
import Button              from "react-bootstrap/Button";
import { useCookies } from "react-cookie";
import "./Login.css";
import { authApi }         from "../../service/auth";
import { toast }           from "react-toastify";
import { store } from '../../service/store/store';
import { authenticate, updateAuth } from '../../service/auth/actions';
import { Redirect } from "react-router-dom";

export const Login = () => {
    const [username, setUsername] = useState("admin");
    const [password, setPassword] = useState("123");
    const [previous] = useState("/")
    const [cookie, setCookie] = useCookies(['user'])

    const shouldRedirect = () => {
        if (cookie.token) {
            store.dispatch(authenticate())
            store.dispatch(updateAuth(
                cookie.user,
                cookie.token
            ));
            return true
        }
        return false;
    }

    const validateForm = () => username.length > 0 && password.length > 0;

    function handleSubmit() {
        authApi
            .login(username, password)
            .then(user => {
                setCookie("token", user.data.accessToken, {path: "/"})
                setCookie("user", user.data, {path: "/"})
                store.dispatch(authenticate())
                store.dispatch(updateAuth(
                    user.data,
                    user.data.accessToken
                ));
            })
            .catch(err => toast.error(err.statusText))
    }
    const login = () => {
        return (
            <div className="Login">
                <Form onSubmit={handleSubmit}>
                    <Form.Group size="lg" controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            autoFocus
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Button block size="lg" disabled={!validateForm} onClick={handleSubmit}>
                        Login
                    </Button>
                </Form>
            </div>
        )
    }

    return (
        shouldRedirect() ? <Redirect to={previous} /> : login()
    );
}