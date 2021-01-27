import React, { useState } from 'react';
import { Button }          from "react-bootstrap";
import { toast }           from "react-toastify";
import { questionApi }     from "../../service/question";
import { Icon }            from "../../components/Icon";
import { Answers }         from "./components/Answers";
import { Question }        from "./components/Question";
import { Sip }             from "./components/Sip";

export const TranslateRule = ({rule, lang, showAnswers}) => {
    const [loading, setLoading] = useState(true)
    const [update, setUpdate] = useState(false)
    const [translateRule, setTranslateRule] = useState(rule.translate)

    const setRule = (rule, lang) => {
        setTranslateRule({
            id: null,
            rule: "",
            answers: null,
            sip: rule.sip,
            lang: lang,
            translation_id: rule.id,
            type: rule.type.name,
            type_id: rule.type_id
        })
    }

    if (loading) {
        if (translateRule === null) {
            setRule(rule, lang)
        } else {
            setUpdate(true)
            setTranslateRule(rule.translate)
        }
        setLoading(false)
    }

    const deleteRule = () => {
        const confirmBox = window.confirm('Etes-vous sûr de vouloir supprimer cette règle ?');
        if(confirmBox) {
            questionApi
                .deleteRule(translateRule.id)
                .then(() => {
                    toast.success("Règle " + rule.id + " supprimée")
                    setRule(translateRule, lang)
                })
                .catch(err => toast.error(err))
        }
    }

    const createRule = () => {
        if (update) {
            questionApi
                .updateRule(translateRule.id, translateRule.rule, translateRule.answers, translateRule.sip)
                .then(() => {
                    toast.success("Traduction mise à jour")
                })
                .catch(err => {
                    toast.error(err.message)
                })
        } else {
            questionApi
                .addTranslateRule(translateRule)
                .then(() => toast.success("Traduction ajoutée"))
                .catch(err => toast.error(err.message))
        }
    }

    const setQuestion = (question) => {
        setTranslateRule({...translateRule, rule: question})
    }

    const setAnswers = (answers) => {
        setTranslateRule({...translateRule, answers: answers})
    }

    const setSip = (sip) => {
        setTranslateRule({...translateRule, sip: sip})
    }

    const renderDeleteButton = () => {
        if (translateRule.id !== null) {
            return (
                <div>
                    <Button onClick={deleteRule} className={"btn-danger ml-1"}><Icon icon={"trash"}/></Button>
                </div>
            )
        }
    }

    return !loading ? (
        <tr>
            <th scope="row">{translateRule.id}</th>
            <td>{rule.type.name}</td>
            <Question question={translateRule.rule} setQuestion={setQuestion} />
            {showAnswers && <Answers answers={translateRule.answers} setAnswers={setAnswers} />}
            <Sip sip={translateRule.sip} setSip={setSip} />
            <td>
                <div className="btn-group" role="group">
                    <div>
                        <Button onClick={createRule} className={"btn-success btn-rounded"}><Icon icon={"save"} /></Button>
                    </div>
                    {renderDeleteButton()}
                </div>
            </td>
        </tr>
    ) : null;
}