import React from 'react';
import { Form }                       from "react-bootstrap";

export const Filer = ({onSelectedType}) => {
    const types = [
        {label: 'Tout', id: 'all', checked: true},
        {label: 'Everyone', id: 'everyone'},
        {label: 'Duel', id: 'duels'},
        {label: 'Amitié', id: 'friendships'},
        {label: 'Questions', id: 'questions'},
        {label: 'Cinéma', id: 'Cinéma'},
        {label: 'Histoire', id: 'Histoire'},
        {label: 'Jeux-Vidéo', id: 'Jeux-Vidéo'},
        {label: 'Musique', id: 'Musique'},
        {label: 'Série', id: 'Série'},
        {label: 'Sport', id: 'Sport'},
    ]
    return (
        <Form className={"container"}>
            <div key={`inline-radio`} className="mb-3">
                {types.map((type) => {
                    return (
                            <Form.Check
                                inline
                                label={type.label}
                                type={"radio"}
                                id={type.id}
                                key={type.id}
                                name={"type"}
                                defaultChecked={type.checked}
                                onChange={onSelectedType}
                            />
                    )
                })}
            </div>
        </Form>
    );
}