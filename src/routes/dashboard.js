import express from 'express'

import { getData } from '../controller/dashboard.js';

const dashboardRouter = express.Router();

dashboardRouter.get('/', getData)


export default dashboardRouter;