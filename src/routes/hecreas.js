import express from 'express'
import multer from 'multer'

import { createHecras, uploadFile } from '../controller/hecras.js'

const hecrasRouter = express.Router()

const fileStoreage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        const time = new Date().getTime()
        const ext = 'xlsx'
        cb(null, `${time}.${ext}`);
    }
})

const upload = multer({storage: fileStoreage})

hecrasRouter.post('/upload', upload.single('file'),  uploadFile)
hecrasRouter.post('/api', createHecras)

export default hecrasRouter;