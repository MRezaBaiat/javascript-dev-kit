"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const initEmail = (email) => {
    if (!email) {
        return undefined;
    }
    if (!isEmailValid(email)) {
        return undefined;
    }
    return email.toLowerCase();
};
const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};
exports.default = {
    initEmail,
    isEmailValid
};
