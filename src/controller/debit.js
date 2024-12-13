import { insertDebit } from "../services/debitService.js" 
import { eventHecras } from "../event/hecrasEvent.js"


export const debitInsert = async (req, res) => {
    const body = req.body
    const data = await insertDebit(body)
    eventHecras.emit('onInsert', data)
    res.status(200).json(data)
}