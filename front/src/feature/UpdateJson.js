import React, { useEffect, useState } from "react";

export const UpdateJson = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [rules, setRules] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5000/question")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setRules(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    const updateRule = (rule) => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({rule: rule.rule, sip: rule.sip, answers: JSON.stringify(rule.answers)})
        };
        fetch('http://localhost:5000/question/' + rule.id, requestOptions)
            .then(() => console.log("Rule id " + rule.id + "updated"))
    }
    const updateJson2 = () => {
        let rule = rules[402]
        let answers = []
        if(rule !== undefined) {
            if (rule.name === "questions") {
                if (rule.answers !== null && rule.answers.length > 4) {
                    const tmpAnswers = rule.answers.split(';');
                    if (tmpAnswers.length === 11) {
                        answers = [
                            {content: tmpAnswers[2].split(":")[2].slice(1, -1), true_false: tmpAnswers[4] === "i:1"},
                            {content: tmpAnswers[7].split(":")[2].slice(1, -1), true_false: tmpAnswers[9] === "i:1"},
                        ];
                    } else if (tmpAnswers.length === 21) {
                        answers = [
                            {content: tmpAnswers[2].split(":")[2].slice(1, -1), true_false: tmpAnswers[4] === "i:1"},
                            {content: tmpAnswers[7].split(":")[2].slice(1, -1), true_false: tmpAnswers[9] === "i:1"},
                            {content: tmpAnswers[12].split(":")[2].slice(1, -1), true_false: tmpAnswers[14] === "i:1"},
                            {content: tmpAnswers[17].split(":")[2].slice(1, -1), true_false: tmpAnswers[19] === "i:1"},
                        ]
                    }
                    rule.answers = answers
                }
            } else {
                rule.answers = null
            }
            updateRule(rule)
        }
        return (<h2>Done</h2>)
    }

    const updateJson = () => {
        rules.forEach(rule => {
            let answers = []
            if (rule.name === "questions") {
                if(rule.answers !== null && rule.answers.length > 4) {
                    const tmpAnswers = rule.answers.split(';');
                    if (tmpAnswers.length === 11) {
                        answers = [
                            {content: tmpAnswers[2].split(":")[2].slice(1, -1), true_false: tmpAnswers[4] === "i:1"},
                            {content: tmpAnswers[7].split(":")[2].slice(1, -1), true_false: tmpAnswers[9] === "i:1"},
                        ];
                    } else if (tmpAnswers.length === 21) {
                        answers = [
                            {content: tmpAnswers[2].split(":")[2].slice(1, -1), true_false: tmpAnswers[4] === "i:1"},
                            {content: tmpAnswers[7].split(":")[2].slice(1, -1), true_false: tmpAnswers[9] === "i:1"},
                            {content: tmpAnswers[12].split(":")[2].slice(1, -1), true_false: tmpAnswers[14] === "i:1"},
                            {content: tmpAnswers[17].split(":")[2].slice(1, -1), true_false: tmpAnswers[19] === "i:1"},
                        ]
                    }
                    rule.answers = answers
                }
            } else {
                rule.answers = null
            }
            updateRule(rule)
        })
        return (<h2>Done</h2>)
    }

    if (error) {
        return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Chargement...</div>;
    } else {
        return (
            <div>
                {/*{updateJson2()}*/}
                {updateJson()}
            </div>
        )
    }
}