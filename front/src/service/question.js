import { requestApi } from "./request";

export const questionApi = {
    getQuestions: () =>
        new Promise((resolve, reject) => {
            requestApi
                .get("question")
                .then(res =>resolve(res))
                .catch(err => reject(err))
        }),
    getQuestionsByLang: lang =>
        new Promise((resolve, reject) => {
            requestApi
                .get("question/lang/" + lang)
                .then(res =>resolve(res))
                .catch(err => reject(err))
    }),
    getQuestionsByType: id =>
        new Promise((resolve, reject) => {
            requestApi
                .get("question/type" + id)
                .then(res =>resolve(res))
                .catch(err => reject(err))
        }),
    updateRule: (id, rule, answers, sip) =>
        new Promise((resolve, reject) => {
            requestApi
                .put("question/" + id, {
                    rule: rule,
                    answers: JSON.stringify(rule.answers),
                    sip: sip
                })
                .then(res =>resolve(res))
                .catch(err => reject(err))
        }),
    addRule: (type, rule, answers, sip, lang) =>
        new Promise((resolve, reject) => {
            requestApi
                .post("question", {
                    type_id: type,
                    rule: rule,
                    answers: JSON.stringify(rule.answers),
                    sip: sip,
                    lang: lang
                })
                .then(res =>{
                    if(res.status >= 300) {
                        reject(res.statusText)
                    }
                    resolve(res)
                })
                .catch(err => reject(err))
        }),
    deleteRule: (id) =>
        new Promise((resolve, reject) => {
            requestApi
                .delete("question/" + id)
                .then(res =>resolve(res))
                .catch(err => reject(err))
        }),
}