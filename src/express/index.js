const express = require('express');
const bodyParser = require('body-parser');
const db = require('../db');
const {
    usersHandler,
    banksHandler,
    transactionsHandler
} = require('./handlers');

const app = express();
const port = 4001;
app.use(bodyParser.json());

const dbMdw = (req, res, next) => {
    Object.assign(req, { db });
    next();
}

app.get('/users', dbMdw, usersHandler.get);
app.get('/users/:id', dbMdw, usersHandler.getOne);
app.post('/users', dbMdw, usersHandler.post);
app.patch('/users/:id', dbMdw, usersHandler.patch);
app.delete('/users/:id', dbMdw, usersHandler.remove);

app.get('/banks', dbMdw, banksHandler.get);
app.get('/banks/:id', dbMdw, banksHandler.getOne);
app.post('/banks', dbMdw, banksHandler.post);
app.patch('/banks/:id', dbMdw, banksHandler.patch);
app.delete('/banks/:id', dbMdw, banksHandler.remove);

app.get('/transactions', dbMdw, transactionsHandler.get);
app.get('/transactions/:id', dbMdw, transactionsHandler.getOne);
app.post('/transactions', dbMdw, transactionsHandler.post);
app.patch('/transactions/:id', dbMdw, transactionsHandler.patch);
app.delete('/transactions/:id', dbMdw, transactionsHandler.remove);

app.listen(port, () => {
    console.log(`cil-nodejs-grpc-express listening at http://localhost:${port}`)
});
