import axios from "axios";
import fs from 'fs'
import { insertStation, selectAllStation, selectStation, updateStation} from "../services/stationService.js";

export const createStation = async (req, res) => {
    const data = await insertStation(req.body)
    res.status(200).json(data)
}
export const putStation = async (req, res) => {
    const payload = {
        hardware_code: req.params.hardware_code,
        data: req.body
    }
    const data = await updateStation(payload)
    res.status(200).json(data)
}
export const getStations = async (req, res) => {
    const data = await selectAllStation()
    res.status(200).json(data)
}

export const getDetailStation = async (req, res) => { 
    const hardware_code = req.params.hardware_code
    const data = await selectStation(hardware_code)
    res.status(200).json(data)
}

export const getImage = async (req, res) => {
    try {
        
        const hardware_code = req.params.hardware_code
        const filePath = 'public/image/cctv.jpg'
        const image = await axios.get('http://103.184.53.236/sistarum/hardwarecctv/'+hardware_code)
        const imageMatch = image.data.match(/ftp_logger\/totalcamera.*.jpg/g)
        const response = await axios.get('http://103.184.53.236/'+imageMatch[0], {
            responseType: 'stream'
        })
        const promise = new Promise((resolve, reject) => {
            response.data.pipe(fs.createWriteStream(filePath))
            .on('error', reject)
            .once('close', () => resolve(filePath))
        })
        promise.then((data) => {
            res.status(200).json('OK')
        })
    } catch (error) {
        res.status(400).send(error)
    }
}