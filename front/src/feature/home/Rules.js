import React, { useEffect, useState } from "react";
import { Filer }                      from "./Filter";
import { Table }       from "react-bootstrap";
import { Rule }        from "./Rule";
import { questionApi } from "../../service/question";

export const Rules = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [rules, setRules] = useState([]);
    const [selectedRules, setSelectedRules] = useState([]);
    const [error, setError] = useState(null);
    const [selectedType, setSelectedType] = useState("all");

    useEffect(() => {
        questionApi.getQuestions()
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
            const filteredRules = rules.filter(rule => rule.type.name === newType.target.id)
            setSelectedRules(filteredRules)
        }
    }

    const showAnswers = () => {
        return selectedType === 'all' || selectedType === 'questions';

    }

    if (error) {
        return <div>Erreur : {error.message}</div>;
    }else {
        return (
            <div className={"container-fluid"}>
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
                        (!isLoaded) ? <tr><td colSpan={6} className={"text-center"}><h1>Chargement...</h1></td></tr> :
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