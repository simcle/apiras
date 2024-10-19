import { getBebApi } from "../services/sistarumService.js";
import BebapiModel from "../models/bebapi.js";
import { CronJob } from 'cron'

import { eventSistarum } from "../event/sistarurmEvent.js";

export const getDataBebApi = async () => {
    const result = await getBebApi()
    eventSistarum.emit('onGetData', result)
    for(let i = 0; i < result.length; i++) {
        const el = result[i]
        const tlocal = new Date(el.timestamp)
        const data = await BebapiModel.findOne({$and: [{hardware_code: el.hardware_code}, {tlocal: tlocal}]})
        if(!data) {
            await BebapiModel.create({
                hardware_code: el.hardware_code,
                tma_value: el.tma_value,
                pos_name: el.pos_name,
                coordinate: el.coordinate,
                k1: el.k1,
                k2: el.k2,
                k3: el.k3,
                tlocal: tlocal,
                debit: el.debit
            })
        }
    }
}

CronJob.from({
    cronTime: '0 */5 * * * *',
    onTick: function() {
        getDataBebApi()
        const date = new Date()
    },
    start: true
})

getDataBebApi()