import React, { useRef, useState } from 'react';
import { Button }                  from "react-bootstrap";
import { toast }                   from "react-toastify";
import { questionApi }             from "../../service/question";
import { Icon }                    from "../../components/Icon";
import autosize                    from "autosize";
import { text }                    from "@fortawesome/fontawesome-svg-core";

export const Rule = ({rule, showAnswers}) => {
    const style = {
        maxHeight: "75px",
        minHeight: "38px",
        resize: "none",
        padding: "9px",
        boxSizing: "border-box",
        fontSize: "15px"
    };
    const [saveRule] = useState(rule)
    const [question, setQuestion] = useState(rule.rule)
    const [answers, setAnswers] = useState(rule.answers)
    const [sip, setSip] = useState(rule.sip)

    const [editingRule, setEditingRule] = useState(false)
    const [editingAnswers, setEditingAnswers] = useState(false)
    const [editingSip, setEditingSip] = useState(false)
    const [visible, setVisible] = useState(true)

    const updateRule = () => {
        if(saveRule.rule !== question || saveRule.sip !== sip || saveRule.answers !== answers) {
            questionApi
                .updateRule(rule.id, question, answers, sip)
                .then(()=> toast.success("Règle id " + rule.id + " mise à jour"))
                .catch(err => toast.error(err.message))
        } else {
            toast.error("Pas de modification")
        }
    }

    const deleteRule = () => {
        const confirmBox = window.confirm('Etes-vous sûr de vouloir supprimer cette règle ?');
        if(confirmBox) {
            questionApi
                .deleteRule(rule.id)
                .then(() => {
                    toast.success("Règle " + rule.id + " supprimée")
                    setVisible(false)
                })
                .catch(err => toast.error(err))
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
                    {<textarea
                        style={style}
                        autoFocus
                        className="form-control"
                        value={question}
                        onChange={e => setQuestion(e.target.value)}
                        onBlur={() => onBlurRule()}
                    />}
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
                    <td width={500}>
                        <textarea
                            style={{
                                maxHeight: "75px",
                                minHeight: "200px",
                                resize: "none",
                                padding: "9px",
                                boxSizing: "border-box",
                                fontSize: "15px"}}
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

    return visible ? (
        <tr>
            <th scope="row">{rule.id}</th>
            <td>{rule.type.name}</td>
            {renderRule()}
            {showAnswers && renderAnswers()}
            {renderSip()}
            <td>
                <div className="btn-group" role="group">
                    <div>
                        <Button onClick={updateRule} className={"btn-success btn-rounded"}><Icon icon={"save"} /></Button>
                    </div>
                    <div>
                        <Button onClick={deleteRule} className={"btn-danger ml-1"}><Icon icon={"trash"}/></Button>
                    </div>
                </div>
            </td>
        </tr>
    ) : null;
}