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
    getQuestionsByType: (id, lang) =>
        new Promise((resolve, reject) => {
            requestApi
                .get("question/type/" + id + "/" + lang)
                .then(res =>resolve(res))
                .catch(err => reject(err))
        }),
    getQuestionsWithTranslate: (initialLang, lang) =>
        new Promise((resolve, reject) => {
            requestApi
                .get("question/translate/" + initialLang + "/" + lang)
                .then(res =>resolve(res))
                .catch(err => reject(err))
        }),
    updateRule: (id, rule, answers, sip) =>
        new Promise((resolve, reject) => {
            requestApi
                .put("question/" + id, {
                    rule: rule,
                    answers: rule.answers,
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
                    answers: answers,
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
    addTranslateRule: (translateRule)  =>
        new Promise((resolve, reject) => {
            requestApi
                .post("question/translate", {
                    type_id: translateRule.type_id,
                    rule: translateRule.rule,
                    answers: translateRule.answers,
                    sip: translateRule.sip,
                    lang: translateRule.lang,
                    translation_id: translateRule.translation_id
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
    getDistinctLanguages: () =>
        new Promise((resolve, reject) => {
            requestApi
                .get("question/lang")
                .then(res =>resolve(res))
                .catch(err => reject(err))
        }),
}