//https://jsonplaceholder.typicode.com/users/5
//https://testapi.devtoolsdaily.com/users/4
import express from 'express';
import {ProvideData} from '../controller/controller.js'
const route = express.Router();

route.get('/data/:id', ProvideData);
// route.get('/data/:id', CachingFetch, ProvideData);

export default route;