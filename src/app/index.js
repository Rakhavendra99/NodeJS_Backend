'use strict';

//Imports
import express from 'express';
import RouterOptions from '../config/RouterOptions';
import ProcessRoutes from './ProcessRoutes';


//Routes
import authRouters from '../otp-auth/index'

import countryRouters from './Country';
import measurementTypeRouters from './MeasurementType';
import productTypeRouters from './ProductType';
import userRouters from './User';
import productRouters from './Product';

//Process Auth router
let authRouter = express.Router(RouterOptions);
if (authRouters && authRouters.length > 0) {
    authRouter = ProcessRoutes(authRouter, authRouters);
} else {
    console.error('There is no user route configured')
}

//Country router
let countryRouter = express.Router(RouterOptions);
if (countryRouters && countryRouters.length > 0) {
    countryRouter = ProcessRoutes(countryRouter, countryRouters);
} else {
    console.error('There is no country route configured')
}



//Measurement Type router
let measurementTypeRouter = express.Router(RouterOptions);
if (measurementTypeRouters && measurementTypeRouters.length > 0) {
    measurementTypeRouter = ProcessRoutes(measurementTypeRouter, measurementTypeRouters);
} else {
    console.error('There is no measurement type route configured')
}


//Product Type router
let productTypeRouter = express.Router(RouterOptions);
if (productTypeRouters && productTypeRouters.length > 0) {
    productTypeRouter = ProcessRoutes(productTypeRouter, productTypeRouters);
} else {
    console.error('There is no Product Type route configured')
}

//User router
let userRouter = express.Router(RouterOptions);
if (userRouters && userRouters.length > 0) {
    userRouter = ProcessRoutes(userRouter, userRouters);
} else {
    console.error('There is no user route configured')
}

//Product router
let productRouter = express.Router(RouterOptions);
if (productRouters && productRouters.length > 0) {
    productRouter = ProcessRoutes(productRouter, productRouters);
} else {
    console.error('There is no product route configured')
}


export {
    authRouter,
    countryRouter,
    measurementTypeRouter,
    productTypeRouter,
    userRouter,
    productRouter
};