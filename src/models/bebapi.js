import mongoose from "mongoose";

const { Schema } = mongoose;

const bebapiSchema = new Schema({
    hardware_code: {type: String},
    tma_value: {type: Number},
    pos_name: {type: String},
    coordinate: {type: Array},
    tlocal: {type: Date},
    k1: {type: Number},
    k2: {type: Number},
    k3: {type: Number},
    debit: {type: Number}
}, {
    timestamps: true
})

const BebapiModel = mongoose.model('bebapi', bebapiSchema)

export default BebapiModel