import mongoose from "mongoose";
const { Schema } = mongoose

const stationSchema = new Schema({
    pos_name: {type: String},
    hardware_code: {type: String},
    coordinate: {type: Array},
    no_pos: {type: String},
    desa: {type: String},
    kecamatan: {type: String},
    kabupaten: {type: String},
    provinsi: {type: String},
    tahun_dibangun: {type: String},
    didirikan: {type: String},
    wilayah_sungai: {type: String},
    elevasi: {type: String},
    station: {type: Number, default: null},
    k1: {type: Number, default: null},
    k2: {type: Number, default: null},
    k3: {type: Number, default: null},
}, {
    timestamps: true
})

const StationModel = mongoose.model('Station', stationSchema)
export default StationModel