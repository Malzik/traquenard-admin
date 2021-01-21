import { Form, FormGroup, FormLabel, Button } from "react-bootstrap";
import React              from "react";

export const AddRule = () => {

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
    ];
    return (
        <Form className="m-4">
            <Form.Row>
                <div className={"form-row"}>
                    <div className="col-md-4 mb-3">
                        <FormLabel htmlFor="type">Type de question</FormLabel>
                        <select className="custom-select" name="type" id="type" required>
                            {
                                types.map(type => <option value={type.id}>{type.label}</option>)
                            }
                        </select>
                    </div>
                    <div className="col-md-4 mb-3">
                        <label htmlFor="sip">Gorgées</label>
                        <input type="number" name="sip" className="form-control" id="sip" required />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label htmlFor="langue">Langue</label>
                        <input type="text" name="lang" className="form-control" id="langue" value="fr" required />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="enonce">Enoncé</label>
                        <textarea name="rule" className="form-control" id="enonce" aria-label="With textarea" />
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="answers">Réponse</label>
                        <input type="text" className="form-control" name="answers" id="inputPassword4" placeholder="Réponses (optionnel, séparé par un ';')" />
                    </div>
                </div>
                <Button>Submit</Button>
            </Form.Row>
        </Form>
    );
}