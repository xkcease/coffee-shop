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

export { queryString, throttle, debounce };
