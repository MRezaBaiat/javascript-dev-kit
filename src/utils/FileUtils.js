"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const initFileName = (fileName) => {
    return fileName.replace(/[/\\?%*:|"<>]/g, '-');
};
const getFileName = (path) => {
    return decodeURIComponent(path)
        .replace(/^.*[\\\/]/, '')
        .replace('primary:', '');
};
const getFileExtension = (filename) => {
    return filename.split('.').pop();
};
const generateNameFromUrl = (url) => {
    url = decodeURIComponent(url);
    url = url
        .replace('http://', '')
        .replace('https://', '')
        .replaceAll('/', '_')
        .replaceAll(String.fromCharCode(92), '_')
        .replaceAll('|', '_')
        .replaceAll('?', '_')
        .replaceAll('*', '_')
        .replaceAll('<', '_')
        .replaceAll('>', '_')
        .replaceAll('"', '_')
        .replaceAll(':', '_')
        .replaceAll('.', '_');
    return url;
};
exports.default = {
    initFileName,
    generateNameFromUrl,
    getFileName,
    getFileExtension
};
