function queryString(o) {
    let params = '';
    for (let key in o) {
        params += `${key}=${o[key]}&`;
    }

    return params.slice(0, -1);
}

function throttle(func, wait, ...rest) {
    let time;
    return function () {
        if (!time) {
            time = setTimeout(() => {
                func.apply(this, rest);
                time = null;
            }, wait);
        }
    };
}

function debounce(callback, delay, ...rest) {
    let timer = 0;

    return function () {
        clearTimeout(timer);

        timer = setTimeout(() => {
            Reflect.apply(callback, this, rest);
        }, delay);
    };
}

function formatDate(timestamp) {
    let date = new Date(timestamp);

    let YY = date.getFullYear() + '-';
    let MM =
        (date.getMonth() + 1 < 10
            ? '0' + (date.getMonth() + 1)
            : date.getMonth() + 1) + '-';
    let DD = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    let hh =
        (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    let mm =
        (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) +
        ':';
    let ss =
        date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();

    return YY + MM + DD + ' ' + hh + mm + ss;
}

export { queryString, throttle, debounce, formatDate };
