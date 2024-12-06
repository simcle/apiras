import express from 'express'

import { getData, getDataForApi } from '../controller/dashboard.js';

const dashboardRouter = express.Router();

dashboardRouter.get('/', getData)
dashboardRouter.get('/api/sistarum', getDataForApi)

export default dashboardRouter;