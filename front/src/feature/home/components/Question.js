import React, { useState } from "react";

export const Question = ({question, setQuestion}) => {
    const [editingQuestion, setEditingQuestion] = useState(false)

    const onFocusRule = () => {
        setEditingQuestion(true)
    }
    const onBlurRule = () => {
        setEditingQuestion(false)
    }

    const renderRule = () => {
        if(editingQuestion) {
            return (
                <td>
                    {<textarea
                        style={{
                            maxHeight: "75px",
                            minHeight: "38px",
                            resize: "none",
                            padding: "9px",
                            boxSizing: "border-box",
                            fontSize: "15px"
                        }}
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

    return renderRule()
}