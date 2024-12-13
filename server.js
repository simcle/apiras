process.env.TZ = 'Asia/Jakarta'

import express from 'express'
import cors from 'cors'
import {createServer} from 'http'
import {Server} from 'socket.io'
import mongoose from 'mongoose'
import path from 'path'
import * as url from 'url'

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

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const dir = path.join(__dirname, 'public')
app.use('/public/', express.static(dir))

import {getDataBebApi} from './src/utils/sistarum.js'

import { eventSistarum } from './src/event/sistarurmEvent.js'
import { eventHecras } from './src/event/hecrasEvent.js'
io.on('connection', (socket) => {
    getDataBebApi()
})

eventSistarum.on('onGetData', (data) => {
    io.emit('sistarum', data)
})

eventHecras.on('onSetData', (data) => {
    io.emit('hecras', data)
})

eventHecras.on('onInsert', (data) => {
    io.emit('popup', data.debit)
})

import dashboardRouter from './src/routes/dashboard.js'
import stationRouter from './src/routes/stations.js'
import hecrasRouter from './src/routes/hecreas.js'
import debitRouter from './src/routes/debit.js'

app.use('/', dashboardRouter)
app.use('/stations', stationRouter)
app.use('/hecras', hecrasRouter)
app.use('/debit', debitRouter);

const PORT = 5000
mongoose.set("strictQuery", false);
mongoose.connect('mongodb://admin:pwlan123@localhost:27017/hecras?authSource=admin', {
    autoIndex: true
})
.then(() => {
    httpServer.listen(PORT, () => console.log(`Server listen on port ${PORT}`));
})

