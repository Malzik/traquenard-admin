import React, { useState } from 'react';
import { Button }          from "react-bootstrap";
import { toast }           from "react-toastify";

export const Rule = ({rule, showAnswers}) => {
    const [saveRule] = useState(rule.rule)
    const [question, setQuestion] = useState(rule.rule)
    const [sip, setSip] = useState(rule.sip)
    const [answers, setAnswers] = useState(JSON.parse(rule.answers))

    const [editingRule, setEditingRule] = useState(false)
    const [editingAnswers, setEditingAnswers] = useState(false)
    const [editingSip, setEditingSip] = useState(false)

    const updateRule = () => {
        if(saveRule !== question) {
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({rule: question, sip: sip, answers: JSON.stringify(answers)})
            };
            fetch('/api/question/' + rule.id, requestOptions)
                .then(() => toast.success("Règle id " + rule.id + " mise à jour"))
        } else {
            toast.error("Pas de modification")
        }
    }

    const onFocusRule = () => {
        setEditingRule(true)
    }
    const onBlurRule = () => {
        setEditingRule(false)
    }
    const onFocusSip = () => {
        setEditingSip(true)
    }
    const onBlurSip = () => {
        setEditingSip(false)
    }
    function onFocusAnswers() {
        setEditingAnswers(true)
    }
    const onBlurAnswers = () => {
        setEditingAnswers(false)
    }

    const renderRule = () => {
        if(editingRule) {
            return (
                <td>
                    <input
                        autoFocus
                        className="w-100 form-control"
                        value={question}
                        onChange={e => setQuestion(e.target.value)}
                        onBlur={() => onBlurRule()}
                    />
                </td>
            )
        }
        return(<td onClick={() => onFocusRule()}>{question}</td>)
    }
    const renderSip = () => {
        if(editingSip) {
            return (
                <td width="100">
                    <input
                        autoFocus
                        className="form-control"
                        value={sip}
                        onChange={e => setSip(e.target.value)}
                        onBlur={() => onBlurSip()} />
                </td>
            )
        }
        return(<td width="100" onClick={() => onFocusSip()}>{sip}</td>)
    }
    const renderAnswers = () => {
        if(answers !== null) {
            if(editingAnswers) {
                return (
                    <td>
                        <input
                            autoFocus
                            className="form-control"
                            value={JSON.stringify(answers)}
                            onChange={e => setAnswers(e.target.value)}
                            onBlur={() => onBlurAnswers()} />
                    </td>
                )
            }
            return(
                <td onClick={() => onFocusAnswers()}>
                    <ul className="list-group">
                        {answers.map((answer, index) => {
                            return (<li
                                key={index}
                                className={`list-group-item ${answer.true_false ? "list-group-item-success" : "list-group-item-danger"}`}>
                                {answer.content}
                            </li>)
                        })}
                    </ul>
                </td>
            )
        } else {
            return (<td />)
        }
    }

    return (
        <tr>
            <th scope="row">{rule.id}</th>
            <td>{rule.name}</td>
            {renderRule()}
            {showAnswers && renderAnswers()}
            {renderSip()}
            <td><Button onClick={updateRule}>✔</Button></td>
        </tr>
    );
}