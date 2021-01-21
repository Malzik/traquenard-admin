import { getConfig } from "./config/config";
import { toast }     from "react-toastify";

const serverUrl = url => {
    const serverUrl = process.env.NODE_ENV === 'production' ? getConfig().url_prod : getConfig().url_dev;

    return serverUrl + "/" + url;
}

const setRequestOptions = (method, body) => {
    return {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };
}

export const questionApi = {
    getQuestions: () =>
        new Promise((resolve, reject) => {
            fetch(serverUrl("question"))
                .then(res =>resolve(res.json()))
                .catch(err => reject(err))
        }),
    updateRule: (id, rule, answers, sip) =>
        new Promise((resolve, reject) => {
            fetch(
                serverUrl("question/" + id),
                setRequestOptions('PUT',{
                    rule: null,
                    answers: JSON.stringify(rule.answers),
                    sip: sip
                })
            )
                .then(() => resolve())
                .catch(err => reject(err))
        })
}
//Vous jouez contre ! À tour de rôle : celui qui trouvera le plus de personnage dans le film Le Seigneur des Anneaux gagne, le perdant boit les gorgées en jeu !