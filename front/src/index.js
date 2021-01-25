import React, { useState } from 'react';
import ReactDOM            from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider }     from 'react-redux';
import './index.css';
import reportWebVitals  from './reportWebVitals';
import { initConfig }   from "./service/config/config";
import { Template }     from "./layout/Template";
import { Rules }        from "./feature/home/Rules";
import { AddRule }      from "./feature/form/AddRule";
import { store }        from './service/store/store';
import * as moment      from "moment";
import { PrivateRoute } from "./layout/Authorization";
import { AuthContext}   from "./feature/login/AuthContext";
import Login            from "./feature/login/Login";

moment.locale('fr');

const AppWrapper = () => {
    const [loggedIn, setLoggedIn] = useState(false)

    return (
        <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
            <Provider store={store}>
                <div>
                    <Router>
                        <Template>
                            <Switch>
                                <Route path="/login" component={Login}/>
                                <PrivateRoute exact path="/" component={Rules}/>
                                <PrivateRoute path="/rules" component={Rules}/>
                                <PrivateRoute path="/add" component={AddRule}/>
                            </Switch>
                        </Template>
                    </Router>
                </div>
            </Provider>
        </AuthContext.Provider>
    )
}
initConfig()
    .then(() => {
        ReactDOM.render(
            (<AppWrapper />),
            document.getElementById('root')
        );
    })
    .catch(err => {
        console.error('App bootstrap stop', err);
    });

reportWebVitals();
