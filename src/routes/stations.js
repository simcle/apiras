import express from 'express'

import { createStation, getStations, getDetailStation, getImage, putStation } from '../controller/stations.js'
const stationRouter = express.Router()

stationRouter.post('/', createStation)
stationRouter.get('/', getStations)
stationRouter.get('/:hardware_code', getDetailStation)
stationRouter.get('/image/:hardware_code', getImage)
stationRouter.put('/:hardware_code', putStation)
export default stationRouter