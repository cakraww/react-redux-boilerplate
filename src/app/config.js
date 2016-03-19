const NODE_ENV = process.env.NODE_ENV;
let SERVICE_URL = '//localhost:8181';

if (NODE_ENV === 'production') {
    SERVICE_URL = '####';
}

export {SERVICE_URL};
