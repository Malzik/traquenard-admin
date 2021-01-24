import React                        from "react";
import { Nav, Navbar }              from "react-bootstrap";
import { NavLink }                  from "react-router-dom";
import JSZip                        from "jszip";
import * as FileSaver                                      from 'file-saver';
import { setAllDataWithoutSubtype, setAllDataWithSubtype } from "../service/export";

export const Header = () => {
    const exportRules = () => {
        let zip = new JSZip();

        setAllDataWithoutSubtype(zip)
            .then(() => setAllDataWithSubtype(zip))
            .then(() => {
                setTimeout(() => {
                    zip.generateAsync({type:"blob"}).then(function(content) {
                        FileSaver.saveAs(content, "export.zip");
                    });
                }, 750)
            })
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
            <Nav navbar className="ml-auto">
                <Nav.Item key="/">
                    <NavLink to="/" className={'mr-2 ml-2'}><span>Règles</span></NavLink>
                </Nav.Item>
                <Nav.Item key="/add">
                    <NavLink to="/add" className={'mr-2 ml-2'}><span>Ajouter une règle</span></NavLink>
                </Nav.Item>
                <Nav.Item key="/export">
                    <NavLink className={'mr-2 ml-2'} to=""><span onClick={exportRules}>Exporter les règles</span></NavLink>
                </Nav.Item>
            </Nav>
        </Navbar>
    );
}