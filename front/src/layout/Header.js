import React                                               from "react";
import { Nav, Navbar }                                     from "react-bootstrap";
import { NavLink }                                         from "react-router-dom";
import JSZip                                               from "jszip";
import * as FileSaver                                      from 'file-saver';
import { setAllDataWithoutSubtype, setAllDataWithSubtype } from "../service/export";
import { store }                                           from "../service/store/store";
import { toast }                                           from "react-toastify";
import { AuthContext }                                     from "../feature/login/AuthContext";
import { questionApi }                                     from "../service/question";

export const Header = () => {
    const exportRules = () => {
        if(store.getState().auth.authenticated) {
            let zip = new JSZip();

            questionApi.getDistinctLanguages()
                .then(languages => {
                    languages.forEach(lang => {
                        zip.folder(lang.lang)
                        setAllDataWithoutSubtype(zip, lang.lang)
                            .then(() => setAllDataWithSubtype(zip, lang.lang))
                    })
                })
                .then(() => {
                    setTimeout(() => {
                        zip.generateAsync({type: "blob"}).then(function (content) {
                            FileSaver.saveAs(content, "export.zip");
                        });
                    }, 750)
                })
        } else {
            toast.error("Vous n'avez pas les droits")
        }
    }
    return (
        <Navbar bg="dark" variant="dark" sticky="top" style={{height: 50}}>
            <Navbar.Brand className={"justify-content-center"}>
                <img src="captain_icon.png"
                     alt="Captain"
                     className={"d-inline-block align-top"}
                     width="40"
                     height="40"/>
            </Navbar.Brand>
            <AuthContext.Consumer>
                {({ loggedIn }) => (
                    loggedIn ? (
                        <Nav navbar className="ml-auto">
                            <Nav.Item key="/">
                                <NavLink to="/" className={'mr-2 ml-2'}><span>R??gles</span></NavLink>
                            </Nav.Item>
                            <Nav.Item key="/add">
                                <NavLink to="/add" className={'mr-2 ml-2'}><span>Ajouter une r??gle</span></NavLink>
                            </Nav.Item>
                            <Nav.Item key="/export">
                                <NavLink className={'mr-2 ml-2'} to=""><span onClick={exportRules}>Exporter les r??gles</span></NavLink>
                            </Nav.Item>
                        </Nav>
                    ) : (
                        <Nav navbar className="ml-auto">
                            <Nav.Item key="/login">
                                <NavLink to="/login" className={'mr-2 ml-2'}><span>Se connecter</span></NavLink>
                            </Nav.Item>
                        </Nav>
                    )
                )}
            </AuthContext.Consumer>
        </Navbar>
    );
}