import React                                      from 'react';
import ReactDOM                                   from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './index.css';
import reportWebVitals                            from './reportWebVitals';
import { initConfig }                             from "./service/config/config";
import { Template }                               from "./layout/Template";
import { Rules }                                  from "./feature/home/Rules";
import { AddRule }                                from "./feature/form/AddRule";

initConfig()
    .then(() => {
        ReactDOM.render(
            <div>
                <Router>
                    <Template>
                        <Switch>
                            <Route exact path="/" component={Rules}/>
                            <Route path="/add" component={AddRule}/>
                        </Switch>
                    </Template>
                </Router>
            </div>,
            document.getElementById('root')
        );
    })
    .catch(err => {
        console.error('App bootstrap stop', err);
    });

reportWebVitals();
