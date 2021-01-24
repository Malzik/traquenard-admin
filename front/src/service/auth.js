import { getConfig } from "./config/config";
import axios         from "axios";

const serverUrl = url => {
    const serverUrl = process.env.NODE_ENV === 'production' ? getConfig().url_prod : getConfig().url_dev;

    return serverUrl + "/auth/" + url;
}

export const authApi = {
    login: (username, password) =>
        new Promise((resolve, reject) => {
            axios
                .post(serverUrl("signin"), { username: username, password: password })
                .then(res => {
                    if(res.status === 200) {
                        resolve(res)
                    }
                    reject(res)
                })
                .catch(err => {
                    reject(err.response.data)
                })
        }),
    refresh: refreshToken =>
        new Promise((resolve, reject) => {
            axios
                .post(serverUrl("refresh"), { refreshToken: refreshToken})
                .then(res => {
                    if(res.status === 200) {
                        resolve(res)
                    }
                    reject(res)
                })
                .catch(err => {
                    reject(err.response.data)
                })
        })
}