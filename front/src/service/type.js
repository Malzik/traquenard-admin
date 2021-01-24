import { getConfig } from "./config/config";
import { store }     from "./store/store";

const serverUrl = url => {
    const serverUrl = process.env.NODE_ENV === 'production' ? getConfig().url_prod : getConfig().url_dev;

    return serverUrl + "/type/" + url;
}

const setRequestOptions = (method = "GET", body ) => {
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

export const typeApi = {
    getTypes: () =>
        new Promise((resolve, reject) => {
            fetch(serverUrl(""), setRequestOptions())
                .then(res => resolve(res.json()))
                .catch(err => reject(err))
        }),
    getTypeWithNoSubType: () =>
        new Promise((resolve, reject) => {
            fetch(serverUrl("noSubtype"), setRequestOptions())
                .then(res => resolve(res.json()))
                .catch(err => reject(err))
        }),
    getTypeWithSubType: () =>
        new Promise((resolve, reject) => {
            fetch(serverUrl("subtype"), setRequestOptions())
                .then(res => resolve(res.json()))
                .catch(err => reject(err))
        }),
    getTypeById: (typeId) =>
        new Promise((resolve, reject) => {
            fetch(serverUrl("" + typeId), setRequestOptions())
                .then(res => resolve(res.json()))
                .catch(err => reject(err))
        })
}