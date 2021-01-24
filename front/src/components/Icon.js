import React from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faTrashAlt} from "@fortawesome/free-regular-svg-icons";

export const Icon = ({icon, style, className}) => {
    const completeStyle = {
        ...style,
    };
    const makeIcon = iconName => {
        let icon;
        switch (iconName) {
            case 'save':
                icon = faSave;
                break;
            case 'trash':
                icon = faTrashAlt;
                break;
            default:
                icon = null;
        }
        return icon;
    }
    return (
        <span style={completeStyle} className={className}>
        <FontAwesomeIcon icon={makeIcon(icon)} />
      </span>
    )
}