import {SERVICE_URL} from '../config';

export function getApiUrl(path) {
    return `${SERVICE_URL}/api/${path}`;
}

export function getClientUrl(url) {
    const prefix = '/app';
    return `${prefix}${url}`;
}

