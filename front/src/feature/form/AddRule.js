import { Button, Col, Form, FormGroup, FormLabel, Row } from "react-bootstrap";
import React, { useEffect, useState }                   from "react";
import { questionApi }                                  from "../../service/question";
import { toast }                                        from "react-toastify";
import { typeApi }                                      from "../../service/type";

export const AddRule = () => {
    const [sip, setSip] = useState(null);
    const [type, setType] = useState(null);
    const [lang, setLang] = useState('fr');
    const [rule, setRule] = useState(null);
    const [answers, setAnswers] = useState(null);
    const [types, setTypes] = useState([])

    useEffect(() => {
        typeApi
            .getTypes()
            .then(res => {
                setTypes(res)
            })
    }, [])

    const verifyField = field => field !== null && field.trim().length > 0

    const handleSubmit = () => {
        if (!verifyField(rule)) {
            console.log("rule error")
            return;
        }
        if (!verifyField(lang)) {
            console.log("lang error")
            return;
        }
        if (!verifyField(type)) {
            console.log("type error")
            return;
        }
        questionApi
            .addRule(type, rule, answers, sip, lang)
            .then(() => toast.success("Règle créé"))
            .catch(err => toast.error(err))
    }

    return (
        <Form className="container mt-4">
            <FormGroup>
                <FormLabel htmlFor="type">Type de question</FormLabel>
                <Form.Control
                    as="select"
                    className="custom-select"
                    name="type"
                    id="type"
                    required
                    onChange={event => setType(event.target.value)}
                >
                    <option defaultValue={true}>-- Choisi un type --</option>
                    {
                        types.map(type => <option key={type.id} value={type.id}>{type.name}</option>)
                    }
                </Form.Control>
            </FormGroup>
            <Row>
                <Col md={6}>
                    <FormGroup>
                        <Form.Control
                            type="number"
                            name="sip"
                            className="form-control"
                            id="sip"
                            required
                            placeholder="Gorgées"
                            onChange={event => setSip(event.target.value)}
                        />
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup>
                        <Form.Control
                            type="text"
                            name="lang"
                            className="form-control"
                            id="langue"
                            value="fr"
                            required
                            placeholder={"Langue"}
                            onChange={event => setLang(event.target.value)}
                        />
                    </FormGroup>
                </Col>
            </Row>
            <FormGroup>
                <Form.Control
                    as="textarea"
                    name="rule"
                    className="form-control"
                    id="enonce"
                    placeholder={"Enoncé"}
                    style={{resize: "none"}}
                    onChange={event => setRule(event.target.value)}/>
            </FormGroup>
            <FormGroup>
                <Form.Control
                    type="text"
                    className="form-control"
                    name="answers"
                    id="inputPassword4"
                    placeholder="Réponses (optionnel, séparé par un ';')"
                    onChange={event => setAnswers(event.target.value)}/>
            </FormGroup>
            <Button className={"btn-block"} onClick={handleSubmit}>Créer la règle</Button>
        </Form>
    );
}