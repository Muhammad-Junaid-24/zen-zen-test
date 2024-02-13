'use strict';

const Hapi = require('@hapi/hapi');
const sdk = require('api')('@deliveroo/v2.0#khimlse1y5bc');

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {

            return 'Hello World!';
        }
    });

    sdk.server('https://api.developers.deliveroo.com/order');
    sdk.createSyncStatus({ status: 'succeeded' }, { order_id: 'order_id' })
        .then(({ data }) => console.log(data))
        .catch(err => console.error(err));

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();