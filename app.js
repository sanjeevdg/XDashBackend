import express from "express";
import http from "http";
import sequelize from './utils/database.js';
import cors from 'cors';


import router from './routes/routes.js';
import bodyParser from "body-parser";
const app = express();

const GlossaryTerm = require('./models/glossaryterm.js');

app.set('port', (process.env.PORT || 5000));

//app.use(express.json());
//app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '5MB' }))
app.use(bodyParser.raw());

//app.use('/uploads', express.static(__dirname + '/uploads'));


app.use((_, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

var corsOptions = {
  origin: "*"
};
app.use(cors(corsOptions));
app.use(router);


app.use('/appdemo', express.static(__dirname + '/appdemo'));


sequelize.sync(); 






app.listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
});
