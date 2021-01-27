import React, { useEffect, useState } from "react";
import { Filter }                     from "./components/Filter";
import { Table }                      from "react-bootstrap";
import { Rule }                       from "./Rule";
import { questionApi }                from "../../service/question";
import { store }                      from "../../service/store/store";
import { setRules as setStoreRules }  from "./store/actions";
import { TranslateRule }              from "./TranslateRule";

export const Rules = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [rules, setRules] = useState([]);
    const [selectedRules, setSelectedRules] = useState([]);
    const [error, setError] = useState(null);
    const [selectedType, setSelectedType] = useState("all");
    const [lang, setLang] = useState("fr");
    const [translateMode, setTranslateMode] = useState(false);
    const [translationLang, setTranslationLang] = useState("en");

    useEffect(() => {
        const storeRules = store.getState().rules.rules;
        if (storeRules.length > 0) {
            setRules(storeRules);
            setSelectedRules(storeRules);
            setIsLoaded(true);
        } else {
            questionApi.getQuestionsWithTranslate("fr", "en")
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
        questionApi.getQuestionsWithTranslate(newLang.target.value, lang)
            .then(
                (result) => {
                    store.dispatch(setStoreRules(result))
                    setTranslateMode(false)
                    setRules(result);
                    const filteredRules = result.filter(rule => rule.type.name === selectedType)
                    setSelectedRules(filteredRules)
                    setIsLoaded(true);
                },
                (error) => {
                    setError(error);
                    setIsLoaded(true);
                }
            )
        setLang(newLang.target.value)
    }

    const updateTranslateMode = () => {
        setTranslateMode(!translateMode)
    }

    const showAnswers = () =>  selectedType === 'all' || selectedType === 'questions';

    if (error) {
        return <div>Erreur : {error.message}</div>;
    } else {
        return (
            <div>
                <Filter onSelectedType={onChange} onLangChange={onLangChange} updateTranslateMode={updateTranslateMode}/>
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
                            selectedRules.map(rule => (
                                <React.Fragment key={"rf" + rule.id}>
                                    <Rule
                                        rule={rule}
                                        key={rule.id}
                                        showAnswers={showAnswers()}/>
                                    {translateMode ? <TranslateRule
                                        rule={rule}
                                        lang={translationLang}
                                        key={"translation" + rule.id}
                                        showAnswers={showAnswers()} /> :null
                                    }
                                </React.Fragment>
                            ))
                    }
                    </tbody>
                </Table>
            </div>
        )
    }
}