import { Col, Form, FormGroup, FormLabel, Row } from "react-bootstrap";
import React, { useEffect, useState }                   from "react";
import { questionApi }                                  from "../../service/question";
import { toast }                                        from "react-toastify";
import { typeApi }                                      from "../../service/type";
import FormControlLabel                                 from "@material-ui/core/FormControlLabel";
import Checkbox                                         from "@material-ui/core/Checkbox";
import Button from '@material-ui/core/Button';

export const AddRule = () => {
    const [sip, setSip] = useState(null);
    const [type, setType] = useState(null);
    const [lang, setLang] = useState('fr');
    const [rule, setRule] = useState(null);
    const [answers, setAnswers] = useState(null);
    const [, forceUpdate] = React.useState(0);

    const [answerInput, setAnswerInput] = useState("");
    const [checkbox, setCheckbox] = useState(false);
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
            toast.error('La règle ne peut pas être vide')
            return;
        }
        if (!verifyField(lang)) {
            toast.error('La langue ne peut pas être vide')
            return;
        }
        if (!verifyField(type)) {
            toast.error('La catégorie ne peut pas être vide')
            return;
        }
        questionApi
            .addRule(type, rule, answers, sip, lang)
            .then(() => toast.success("Règle créé"))
            .catch(err => toast.error(err))
    }

    const addAnswers = () => {
        if (answerInput !== "") {
            if (answers === null) {
                const newAnswer = [{content: answerInput, true_false: checkbox}]
                setAnswers(newAnswer)
            } else {
                const newAnswer = {content: answerInput, true_false: checkbox}
                answers.push(newAnswer)
            }
            setAnswerInput("")
            setCheckbox(false)
        }
    }

    const deleteAnswer = index => {
        answers.splice(index, 1)
        forceUpdate(n => !n)
    }

    const handleKeyPress = (event) => {
        if(event.charCode===13){
            addAnswers()
        }
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
            <Row>
                <Col md={7}>
                    <FormGroup>
                        <Form.Control
                            type="text"
                            name="answers"
                            className="form-control"
                            id="answers"
                            placeholder="Réponses"
                            value={answerInput}
                            onChange={event => setAnswerInput(event.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                    </FormGroup>
                </Col>
                <Col md={3}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="checkedB"
                                color="primary"
                                onChange={event => setCheckbox(event.target.checked)}
                                checked={checkbox}
                                onKeyPress={handleKeyPress}
                            />
                        }
                        label="Bonne réponse&nbsp;?"
                    />
                </Col>
                <Col md={2}>
                    <Button
                        variant="contained"
                        style={{backgroundColor: "#62bfa9"}}
                        onClick={() => addAnswers()}
                    >
                        Ajouter
                    </Button>
                </Col>
            </Row>
            {answers !== null ? (
                <ul className="list-group mt-3">
                    {answers.map((answer, index) => (
                        <li
                            className={`list-group-item ${answer.true_false ? "list-group-item-success" : "list-group-item-danger"} list-group-item d-flex justify-content-between align-items-center`}
                            key={index}>
                            {answer.content}
                            <Button index={index} onClick={() => deleteAnswer(index)}>
                                <span>X</span>
                            </Button>
                        </li>
                    ))}
                </ul>
            ): null}
            <Button className={"btn-block mt-3"} onClick={handleSubmit} variant="contained" color="primary">Créer la règle</Button>
        </Form>
    );
}