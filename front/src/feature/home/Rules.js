import React, { useEffect, useState } from "react";
import { Filer }                      from "./Filter";
import { Table }                      from "react-bootstrap";
import { Rule }                       from "./Rule";
import { questionApi }                from "../../service/question";
import { store }                      from "../../service/store/store";
import { setRules as setStoreRules }                    from "./store/actions";

export const Rules = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [rules, setRules] = useState([]);
    const [selectedRules, setSelectedRules] = useState([]);
    const [error, setError] = useState(null);
    const [selectedType, setSelectedType] = useState("all");
    const [lang, setLang] = useState("fr");

    useEffect(() => {
        const storeRules = store.getState().rules.rules;
        if (storeRules.length > 0) {
            setRules(storeRules);
            setSelectedRules(storeRules);
            setIsLoaded(true);
        } else {
            questionApi.getQuestionsByLang(lang)
                .then(
                    (result) => {
                        store.dispatch(setStoreRules(result))
                        setRules(result);
                        setSelectedRules(result);
                        setIsLoaded(true);
                    },
                    (error) => {
                        setError(error);
                        setIsLoaded(true);
                    }
                )
        }
    }, [])

    const onChange = (newType) => {
        setSelectedType(newType.target.value)
        if(newType.target.value === "all") {
            setSelectedRules(rules);
        } else {
            const filteredRules = rules.filter(rule => rule.type.name === newType.target.value)
            setSelectedRules(filteredRules)
        }
    }

    const onLangChange = (newLang) => {
        setLang(newLang.target.value)
        questionApi.getQuestionsByLang(newLang.target.value)
            .then(
                (result) => {
                    store.dispatch(setStoreRules(result))
                    setRules(result);
                    setSelectedRules(result);
                    setIsLoaded(true);
                },
                (error) => {
                    setError(error);
                    setIsLoaded(true);
                }
            )
    }

    const showAnswers = () =>  selectedType === 'all' || selectedType === 'questions';

    if (error) {
        return <div>Erreur : {error.message}</div>;
    } else {
        return (
            <div>
                <Filer onSelectedType={onChange} onLangChange={onLangChange}/>
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
                            return <Rule
                                rule={rule}
                                key={rule.id}
                                showAnswers={showAnswers()}/>
                        })
                    }
                    </tbody>
                </Table>
            </div>
        )
    }
}