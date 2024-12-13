import mongoose from "mongoose";

const { Schema } = mongoose;

const debitSchema = new Schema({
    debit: {type: Number},
}, {
    timeseries: true
})

const DebitModel = mongoose.model('debit', debitSchema)

export default DebitModel