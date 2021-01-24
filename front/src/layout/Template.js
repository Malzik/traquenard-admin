import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React              from "react";
import { Header }         from "./Header";

export const Template = props => {
    return (
        <div>
            <Header />
            <ToastContainer />
            {props.children}
        </div>
    );
}