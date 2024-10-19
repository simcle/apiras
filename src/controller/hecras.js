
import path from 'path'
import * as url from 'url'
import XLSX from 'xlsx'
const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
import { insertHecras } from '../services/hecreasService.js'
import { eventHecras } from '../event/hecrasEvent.js'

// insert data from hecras via upload file exlsx
export const uploadFile = async (req, res) => {
    const payload = []
    const filetPath = path.join(__dirname, '../../uploads', req.file.filename)
    const workbook = XLSX.readFile(filetPath)

    const sheetName = workbook.SheetNames[0]
    const sheet = workbook.Sheets[sheetName]
    const data = XLSX.utils.sheet_to_json(sheet, {defval: ""})
    for ( let i = 0; i < data.length; i ++) {
        const el = data[i]
        payload.push({
            hardware_code: el.hardware_code,
            station: el.station,
            tma_value: el.tma_value,
            debit: el.debit
        })
    }
    try {
        const data = await insertHecras(payload)
        eventHecras.emit('onSetData', data)
        res.status(201).json({
            message: 'OK',
            data: data
        })   
        
    } catch (error) {
        res.status(400).send(error)
    }
}

// insert data from hecras via API
export const createHecras = async (req, res) => {
    const data = req.body.data
    const payload = []
    for ( let i = 0; i < data.length; i ++) {
        const el = data[i]
        payload.push({
            hardware_code: el.hardware_code,
            station: el.station,
            tma_value: el.tma_value,
            debit: el.debit
        })
    }
    try {
        const data = await insertHecras(payload)
        eventHecras.emit('onSetData', data)
        res.status(201).json({
            message: 'OK',
            data: data
        })  
    } catch (error) {
        res.status(400).send(error)
    }
}