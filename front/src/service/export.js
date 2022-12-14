import { typeApi }     from "./type";
import { questionApi } from "./question";

const setData = (questions) => {
    const data = []
    questions.forEach(question => {
        if (question.answers === null) {
            data.push({
                question: question.rule,
                sip: question.sip,
            })
        } else {
            data.push({
                question: question.rule,
                sip: question.sip,
                answers: question.answers,
            })
        }
    })
    return data;
}
export const setAllDataWithoutSubtype = (zip, lang) => {
    return typeApi
        .getTypeWithNoSubType()
        .then(types => {
            types.forEach(type => {
                questionApi
                    .getQuestionsByType(type.id, lang)
                    .then(questions => {
                        const data = setData(questions)
                        const finalData = {[type.name]: data}
                        zip.file(lang + "/" + type.name + ".json", JSON.stringify(finalData))
                    })
            })
        })
        .then(() => zip)
}
export const setAllDataWithSubtype = (zip, lang) => {
    return typeApi
        .getTypeWithSubType()
        .then(types => {
            let finalData = {}
            Promise.all(types.map(async type => {
                await questionApi
                    .getQuestionsByType(type.id, lang)
                    .then(questions => {
                        const data = setData(questions)
                        finalData = {[type.name]: data, ...finalData}
                    })
            })).then(() => {
                finalData = {[types[0].type2.parent_name]: finalData}
                zip.file(lang + "/" + types[0].type2.parent_name + ".json", JSON.stringify(finalData))
            })
        })
        .then(() => zip)
}