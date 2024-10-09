import StationModel from "../models/stations.js";

export const insertStation =  (req, res) => {
    const payload = req.body
    const station = new StationModel(payload)
    station.save()
    .then((result) => {
        res.status(200).json(result)
    })
}

export const getStations = (req, res) => {
    console.log('hallo')
    StationModel.find()
    .then((result) => {
        res.status(200).json(result)
    })
}