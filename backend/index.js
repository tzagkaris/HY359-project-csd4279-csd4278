const express = require('express');
const cors = require('cors'); 

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));    // extended is not needed 

/* initialize and connect to the database */
const database = require('./database/database.js');
database.initialize();

/* import all the routers from apis and apply them to the server  */
const apiRouter = require('./api/api.index').apiRouter;
app.use(
    '/api',
    apiRouter
);

app.get('/test', (req, res, next) => {
    res.status(200).send({status: 'ok'});
})

app.listen(3000, () => {
    console.log('Listening on port 3000')
})
.on('error', (err) => {
    console.log('Could not listen. Error is: ');
    console.log(err);
})

