import { getConfig } from "./config/config";

const serverUrl = url => {
    const serverUrl = process.env.NODE_ENV === 'production' ? getConfig().url_prod : getConfig().url_dev;

    return serverUrl + "/" + url;
}

export const typeApi = {
    getTypes: () =>
        new Promise((resolve, reject) => {
            fetch(serverUrl("type"))
                .then(res => resolve(res.json()))
                .catch(err => reject(err))
        }),
    getTypeWithNoSubType: () =>
        new Promise((resolve, reject) => {
            fetch(serverUrl("type/noSubtype"))
                .then(res => resolve(res.json()))
                .catch(err => reject(err))
        }),
    getTypeWithSubType: () =>
        new Promise((resolve, reject) => {
            fetch(serverUrl("type/subtype"))
                .then(res => resolve(res.json()))
                .catch(err => reject(err))
        }),
    getTypeById: (typeId) =>
        new Promise((resolve, reject) => {
            fetch(serverUrl("type/" + typeId))
                .then(res => resolve(res.json()))
                .catch(err => reject(err))
        })
}