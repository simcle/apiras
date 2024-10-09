import express from 'express'
import cors from 'cors'
import {createServer, get} from 'http'
import {Server} from 'socket.io'
import mongoose from 'mongoose'

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
    cors: {
        origin: '*',
        methods: ['*']
    }
})
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

import {getDataBebApi} from './src/utils/sistarum.js'

import { eventSistarum } from './src/event/sistarurmEvent.js'
io.on('connection', (socket) => {
    getDataBebApi()
})

eventSistarum.on('onGetData', (data) => {
    io.emit('sistarum', data)
})



import dashboardRouter from './src/routes/dashboard.js'
import stationRouter from './src/routes/stations.js'

app.use('/', dashboardRouter)
app.use('/stations', stationRouter)

const PORT = 3000
mongoose.set("strictQuery", false);
mongoose.connect('mongodb://localhost:27017/hecras', {
    autoIndex: true
})
.then(() => {
    httpServer.listen(PORT, () => console.log(`Server listen on port ${PORT}`));
})