import React                                      from 'react';
import ReactDOM                                             from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider }                                         from 'react-redux';
import './index.css';
import reportWebVitals                                      from './reportWebVitals';
import { initConfig }                                       from "./service/config/config";
import { Template }                                         from "./layout/Template";
import { Rules }                                            from "./feature/home/Rules";
import { AddRule }                                          from "./feature/form/AddRule";
import { Login }                                            from "./feature/login/Login";
import { store }                                            from './service/store/store';
import * as moment                     from "moment";
import { PrivateRoute } from "./layout/Authorization";

moment.locale('fr');

initConfig()
    .then(() => {
        ReactDOM.render(
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
            </Provider>,
            document.getElementById('root')
        );
    })
    .catch(err => {
        console.error('App bootstrap stop', err);
    });

reportWebVitals();
