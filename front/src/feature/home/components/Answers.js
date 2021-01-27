import React, { useState } from "react";

export const Answers = ({answers, setAnswers}) => {
    const [editingAnswers, setEditingAnswers] = useState(false)
    function onFocusAnswers() {
        setEditingAnswers(true)
    }
    const onBlurAnswers = () => {
        setEditingAnswers(false)
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

    return renderAnswers()
}