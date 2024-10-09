import express from 'express'

import { insertStation, getStations } from '../controller/stations.js'
const stationRouter = express.Router()

stationRouter.post('/', insertStation)
stationRouter.get('/', getStations)

export default stationRouter