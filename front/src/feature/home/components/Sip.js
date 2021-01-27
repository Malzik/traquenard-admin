import React, { useState } from "react";

export const Sip = ({sip, setSip}) => {
    const [editingSip, setEditingSip] = useState(false)

    const onFocusSip = () => {
        setEditingSip(true)
    }
    const onBlurSip = () => {
        setEditingSip(false)
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

    return renderSip()
}