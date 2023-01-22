import fs from 'node:fs';
import url from 'node:url';
import http from 'node:http';

const dictionary = JSON.parse(fs.readFileSync('dictionary.json'));
const mindMap = JSON.parse(fs.readFileSync('mindmap.json'));

const CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'x-test,Content-Type,Accept,Access-Control-Allow-Headers',
};

const dictionaryHandler = (request, response) => {
    const parsedURL = url.parse(request.url);

    if (parsedURL.pathname === '/glossary') {
        response.setHeader('Content-Type', 'application/json');
        response.writeHead(200, {
            ...CORS,
        });
        response.end(JSON.stringify(dictionary));
        return;
    } else if (parsedURL.pathname === '/mindmap') {
        response.setHeader('Content-Type', 'application/json');
        response.writeHead(200, {
            ...CORS,
        });
        response.end(JSON.stringify(mindMap));
        return;
    }

    let key = '';
    if (parsedURL.pathname.length > 0) {
        key = parsedURL.pathname.slice(1);
    }

    const defObj = dictionary ? dictionary[key] : null;
    if (!defObj) {
        response.writeHead(404);
        response.end(key + ' was not found');
        return;
    }

    response.setHeader('Content-Type', 'application/json');
    response.writeHead(200, {
        ...CORS,
    });
    response.end(JSON.stringify(defObj));
};

const server = http.createServer(dictionaryHandler);

server.listen(8070, (err) => {
    if (err) {
        return console.log('error starting server: ' + err);
    }

    console.log('server is listening on 8070');
});
