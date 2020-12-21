import axios from 'axios';
import { APPKEY } from './appkey';

const instance = axios.create({
    baseURL: 'http://www.kangliuyong.com:10002',
});

function getData(url, params) {
    return new Promise((resolve, reject) => {
        instance
            .get(url, { params: { appkey: APPKEY, ...params } })
            .then(res => {
                resolve(res.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function postData(url, data) {
    return Promise((resolve, reject) => {
        instance
            .post(url, { appkey: APPKEY, ...data })
            .then(res => {
                resolve(res.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function getAllData(requestArray) {
    let promiseArray = [];
    for (let request of requestArray) {
        let promise = instance.get(request.url, {
            params: { appkey: APPKEY, ...request.params },
        });
        promiseArray.push(promise);
    }
    return new Promise((resolve, reject) => {
        Promise.all(promiseArray)
            .then(dataArray => {
                resolve(dataArray);
            })
            .catch(error => {
                reject(error);
            });
    });
}

export { getData, postData, getAllData };
