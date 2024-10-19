
import StationModel from "../models/stations.js"

export const insertStation = async (payload) => {
    const data = await StationModel.create(payload)
    return data
}

export const updateStation = async (payload) => {
    const hardware_code = payload.hardwareCode
    const data = payload.data
    await StationModel.updateOne({hardware_code: hardware_code}, data)
    return 'OK'
}

export const selectAllStation = async () => {
    const data = await StationModel.find().select("pos_name hardware_code")
    return data
}

export const selectStation = async (payload) => {
    const date = new Date()
    let hour = date.getHours() - 1
    let mnt = date.getMinutes() - 5
    date.setHours(hour)
    date.setMinutes(mnt)
    
    console.log(date.toString())
    const hardware_code = payload
    const data = await StationModel.aggregate([
        {$match: {hardware_code: hardware_code}},
        {$lookup: {
            from: 'bebapis',
            let: {'hardwareCode': '$hardware_code'},
            pipeline: [
                {$match: {
                    $expr: {$gte: ['$tlocal', date]}
                }},
                {$match: {
                    $expr: {$eq: ['$hardware_code', '$$hardwareCode']}
                }},
                {$project: {
                    tlocal: 1,
                    debit: 1,
                    tma_value: 1,
                    k1: 1,
                    k2: 1,
                    k3: 1
                }}
            ],
            as: 'bebapis'
        }},
        {$lookup: {
            from: 'hecras',
            let: {'hardwareCode': '$hardware_code'},
            pipeline: [
                {$sort: {_id: -1}},
                {$match: {
                    $expr: {$eq: ['$hardware_code', '$$hardwareCode']}
                }},
                {$limit: 1},
            ],
            as: 'hecras'
        }},
        {$unwind: {
            path: '$hecras',
            preserveNullAndEmptyArrays: true
        }}
    ])
    return data[0]
}