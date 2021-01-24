import { requestApi } from "./request";

export const typeApi = {
    getTypes: () =>
        new Promise((resolve, reject) => {
            requestApi
                .get("type")
                .then(res =>resolve(res))
                .catch(err => reject(err))
        }),
    getTypeWithNoSubType: () =>
        new Promise((resolve, reject) => {
            requestApi
                .get("type/noSubtype")
                .then(res =>resolve(res))
                .catch(err => reject(err))
        }),
    getTypeWithSubType: () =>
        new Promise((resolve, reject) => {
            requestApi
                .get("type/subtype")
                .then(res =>resolve(res))
                .catch(err => reject(err))
        }),
    getTypeById: (typeId) =>
        new Promise((resolve, reject) => {
            requestApi
                .get("type/" + typeId)
                .then(res =>resolve(res))
                .catch(err => reject(err))
        })
}