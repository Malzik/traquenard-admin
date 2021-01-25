import React            from 'react';
import { Form }         from "react-bootstrap";
import Radio            from "@material-ui/core/Radio";
import FormControl      from "@material-ui/core/FormControl";
import RadioGroup       from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

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
        <Form className={"container mt-2"}>
            <FormControl component="fieldset">
                <RadioGroup row defaultValue={"all"} onChange={onSelectedType}>
                    {types.map((type) => {
                        return (
                            <FormControlLabel key={type.id} value={type.id} control={<Radio />} label={type.label}/>
                        )
                    })}
                </RadioGroup>
            </FormControl>
        </Form>
    );
}