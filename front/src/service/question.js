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
    getQuestionsByType: id =>
        new Promise((resolve, reject) => {
            fetch(serverUrl("question/type/" + id))
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
        }),
    addRule: (type, rule, answers, sip, lang) =>
        new Promise((resolve, reject) => {
            fetch(
                serverUrl("question"),
                setRequestOptions('POST',{
                    type_id: type,
                    rule: rule,
                    answers: JSON.stringify(rule.answers),
                    sip: sip,
                    lang: lang
                })
            )
                .then((res) => {
                    if(res.status >= 300) {
                        reject(res.statusText)
                    }
                    resolve()
                })
                .catch(err => reject(err))
        }),
    deleteRule: (id) =>
        new Promise((resolve, reject) => {
            fetch(
                serverUrl("question/" + id),
                setRequestOptions('DELETE')
            )
                .then(() => resolve())
                .catch(err => reject(err))
        }),
}