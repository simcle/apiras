import mongoose from "mongoose";

const { Schema } = mongoose

const hecrasSechme = new Schema({
    hardware_code: {type: String},
    station: {type: Number, default: null},
    tma_value: {type: Number, default: null},
    debit: {type: Number, default: null}
}, {
    timestamps: true
})

const HecrasModel = mongoose.model('hecras', hecrasSechme);
export default HecrasModel
