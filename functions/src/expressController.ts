// import * as functions from 'firebase-functions';
// import * as admin from 'firebase-admin';
import * as express from 'express';

const app = express();

app.get('/hello', (req, res) => {
    res.status(200).send('Hello World!');
});

export { app }