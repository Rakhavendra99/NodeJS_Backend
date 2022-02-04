'use script';

import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors';
import './util/global';
import OAuth from './oauth';

//Routes configuration
import {
    authRouter,
    countryRouter,
    measurementTypeRouter,
    productTypeRouter,
    userRouter,
    productRouter

} from "./app";

// import dataGenerator from './util/joiDataGenrator';
// import OAuth2Server from './oauth/oauth2-server/lib/server';
const App = express();

// parse application/json
App.use(bodyParser.json({ limit: '50mb', extended: true }));
App.use(bodyParser.urlencoded({ limit: '2mb', extended: true }))
App.use(express.static(path.join(__dirname, 'public')));
App.use(cors());

// Allow to expose custom header
App.use(function (req, res, next) {
    res.header("Access-Control-Expose-Headers", "Access-Control-Allow-Credentials,Authorization,x-Authorization");
    next();
});

// For dev purpose only.Please remove/comment if you're not usng joi schema as data.It will generate sample data based on JOI validation schema
// App.use(function (req, res, next) {
//     const generatedDataFromJoi = dataGenerator(req.body);
//     req.body = generatedDataFromJoi;
//     next();
// });
OAuth(App);

App.use('/api/auth', authRouter);

App.use('/api/country', countryRouter);
App.use('/api/measurementtype', measurementTypeRouter);
App.use('/api/producttype', productTypeRouter);
App.use('/api/user', userRouter);
App.use('/api/product', productRouter);


export default App;