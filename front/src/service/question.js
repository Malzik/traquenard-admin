import { getConfig } from "./config/config";
import { store }     from "./store/store";

const serverUrl = url => {
    const serverUrl = process.env.NODE_ENV === 'production' ? getConfig().url_prod : getConfig().url_dev;

    return serverUrl + "/question/" + url;
}

const setRequestOptions = (method = "GET", body) => {
    const token = store.getState().auth.token;
    return {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
    };
}

export const questionApi = {
    getQuestions: () =>
        new Promise((resolve, reject) => {
            fetch(serverUrl(""), setRequestOptions())
                .then(res =>resolve(res.json()))
                .catch(err => reject(err))
        }),
    getQuestionsByType: id =>
        new Promise((resolve, reject) => {
            fetch(serverUrl("type/" + id), setRequestOptions())
                .then(res =>resolve(res.json()))
                .catch(err => reject(err))
        }),
    updateRule: (id, rule, answers, sip) =>
        new Promise((resolve, reject) => {
            fetch(
                serverUrl(id),
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
                serverUrl(""),
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
                serverUrl(id),
                setRequestOptions('DELETE')
            )
                .then(() => resolve())
                .catch(err => reject(err))
        }),
}