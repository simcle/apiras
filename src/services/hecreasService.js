import HecrasModel from "../models/hecras.js";
import StationModel from "../models/stations.js";

export const insertHecras = async (payload) => {
    const data  = await HecrasModel.create(payload)
    return data
}

export const getLastDataHecras = async () => {
    const data = await StationModel.aggregate([
        {$lookup: {
            from: 'hecras',
            let: {'hardwareCode': '$hardware_code'},
            as: 'hecras',
            pipeline: [
                {$sort: {_id: -1}},
                {$match: {
                    $expr: {$eq: ['$$hardwareCode', '$hardware_code']}
                }},
                {$limit: 1},
                // {$addFields: {
                //     "hecras": {$arrayElemAt:["$hecras", 0] }
                // }}
            ],
        }},
        {$unwind: {
            path: '$hecras',
            preserveNullAndEmptyArrays: true
        }},
        {$project: {
            hardware_code: 1,
            debit: '$hecras.debit',
            tma_value: '$hecras.tma_value',
            createdAt: '$hecras.createdAt'
        }}
    ])
    return data
}
