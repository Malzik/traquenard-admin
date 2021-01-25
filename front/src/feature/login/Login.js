import React, { useState }          from "react";
import Form                         from "react-bootstrap/Form";
import Button                       from "react-bootstrap/Button";
import { useCookies }               from "react-cookie";
import "./Login.css";
import { authApi }                  from "../../service/auth";
import { store }                    from '../../service/store/store';
import { authenticate, updateAuth } from '../../service/auth/actions';
import { Redirect }                 from "react-router-dom";
import { Alert }                    from "react-bootstrap";
import { toast }                    from "react-toastify";
import withAuthProps                from "../withAuthProps";

const Login = ({ setLoggedIn }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null)
    const [previous] = useState("/")
    const [cookie, setCookie] = useCookies(['user'])
    const [visible, setVisible] = useState(true);

    const onDismiss = () => setVisible(false);

    const shouldRedirect = () => {
        if (cookie.token) {
            setLoggedIn(true)
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

    const handleSubmit = e => {
        e.preventDefault()
        authApi
            .login(username, password)
            .then(user => {
                setCookie("refreshToken", user.data.refreshToken, {path: "/"})
                setCookie("token", user.data.accessToken, {path: "/"})
                setCookie("user", user.data, {path: "/"})
            })
            .catch(err => {
                setError(err.message)
                setVisible(true)
            })
    }
    const login = () => {
        return (
            <div className="Login">
                <Form onSubmit={handleSubmit}>
                    {
                        (error !== null && visible) && (
                            <Alert variant="danger" onClose={() => onDismiss(false)} dismissible>
                                {error}
                            </Alert>
                        )
                    }
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
                    <Button block size="lg" type={"submit"} disabled={!validateForm()}>
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

export default withAuthProps(Login)