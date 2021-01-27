import React, { useState } from 'react';
import { Button }                  from "react-bootstrap";
import { toast }                   from "react-toastify";
import { questionApi }             from "../../service/question";
import { Icon }                    from "../../components/Icon";
import { Answers }                 from "./components/Answers";
import { Question }                from "./components/Question";
import { Sip }                     from "./components/Sip";

export const Rule = ({rule, showAnswers}) => {
    const [saveRule] = useState(rule)
    const [question, setQuestion] = useState(rule.rule)
    const [answers, setAnswers] = useState(rule.answers)
    const [sip, setSip] = useState(rule.sip)

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

    return visible ? (
        <tr>
            <th scope="row">{rule.id}</th>
            <td>{rule.type.name}</td>
            <Question question={question} setQuestion={setQuestion} />
            {showAnswers && <Answers answers={answers} setAnswers={setAnswers} />}
            <Sip sip={sip} setSip={setSip} />
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