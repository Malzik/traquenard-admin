import './App.css';
import React, { useEffect, useState } from 'react';
import { Rule }                       from "./components/Rule";
import { Table }                      from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { Filer }                      from "./components/Filter";
import { ToastContainer }             from "react-toastify";

function App() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [rules, setRules] = useState([]);
    const [selectedRules, setSelectedRules] = useState([]);
    const [error, setError] = useState(null);
    const [selectedType, setSelectedType] = useState("all");

    useEffect(() => {
        fetch("/api/question")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setRules(result);
                    setSelectedRules(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    const onChange = (newType) => {
        setSelectedType(newType.target.id)
        if(newType.target.id === "all") {
            setSelectedRules(rules);
        } else {
            const filteredRules = rules.filter(rule => rule.name === newType.target.id)
            setSelectedRules(filteredRules)
        }
    }
    const showAnswers = () => {
        return selectedType === 'all' || selectedType === 'questions';

    }

    if (error) {
        return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Chargement...</div>;
    } else {
        return (
            <div>
                <ToastContainer />
                <Filer onSelectedType={onChange}/>
                <Table striped bordered hover variant="dark">
                    <thead>
                    <tr>
                        <th>#({selectedRules.length})</th>
                        <th>Catégorie</th>
                        <th>Règles</th>
                        {showAnswers() && <th>Réponses</th>}
                        <th>Gorgées</th>
                        <th>Options</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        selectedRules.map(rule => {
                            return <Rule rule={rule} key={rule.id} showAnswers={showAnswers()}/>
                        })
                    }
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default App;
