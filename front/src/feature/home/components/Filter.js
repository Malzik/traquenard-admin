import React            from 'react';
import { Form }         from "react-bootstrap";
import Radio            from "@material-ui/core/Radio";
import FormControl      from "@material-ui/core/FormControl";
import RadioGroup       from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import MenuItem         from "@material-ui/core/MenuItem";
import Select           from "@material-ui/core/Select";
import { Button }       from "@material-ui/core";

export const Filter = ({onSelectedType, onLangChange, updateTranslateMode}) => {
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
        <Form className={"mt-2 m-auto"} style={{display: "flex", justifyContent: "space-around"}}>
            <FormControl component="fieldset">
                <RadioGroup row defaultValue={"all"} onChange={onSelectedType}>
                    {types.map((type) => {
                        return (
                            <FormControlLabel key={type.id} value={type.id} control={<Radio />} label={type.label}/>
                        )
                    })}
                </RadioGroup>
            </FormControl>
            <FormControl className={"mt-1"}>
                <Select
                    labelId="demo-simple-select-placeholder-label-label"
                    id="demo-simple-select-placeholder-label"
                    onChange={onLangChange}
                    defaultValue={"fr"}
                >
                    <MenuItem value={"fr"}>Fr</MenuItem>
                    <MenuItem value={"en"}>En</MenuItem>
                </Select>
            </FormControl>
            <Button onClick={updateTranslateMode}>Mode traduction</Button>
        </Form>
    );
}