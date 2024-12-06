import { getBebApi } from "../services/sistarumService.js"
import { getLastDataHecras } from "../services/hecreasService.js"
import { selectAllStation } from "../services/stationService.js"
export const getData = async (req, res) => {
    try {
        const result = await getBebApi()
        const hecras = await getLastDataHecras()
        for(let i = 0; i < result.length; i++) {
            const el = result[i]
            for(let h = 0; h < hecras.length; h++) {
                const hec = hecras[h]
                if(el.hardware_code == hec.hardware_code) {
                    result[i].hec_tma_value = hec.tma_value
                    result[i].hec_debit = hec.debit
                    result[i].hec_timestamp = hec.createdAt
                    result[i].hec_hardware_code = hec.hardware_code
                }
            }
        }
        const data = {
            "type": "geojson",
            "data": {
                "type": 'FeatureCollection',
                "features": []
            }
        }
        for(let i = 0; i < result.length; i++) {
            const el = result[i]
            data.data.features.push(
                {
                    'type': 'Feature', 
                    'geometry': {
                        'type': 'Point', 
                        'coordinates': [el.coordinate[1], el.coordinate[0]]
                    },
                    'properties': {
                        'hardware_code': el.hardware_code,
                        'pos_name': el.pos_name,
                        'timestamp': el.timestamp,
                        'tma_value': el.tma_value,
                        'hec_timestamp': el.hec_timestamp,
                        'hec_tma_value': el.hec_tma_value,
                        'hec_debit': el.hec_debit,
                        'k1': el.k1,
                        'k2': el.k2,
                        'k3': el.k3,
                        'debit': el.debit
                    }
                }
            )
        }
        const response = {
            geojson: data,
            pos: result
        }
        res.status(200).json(response)
    } catch (error) {
        res.status(400).send('Error')   
    }

}

export const getDataForApi = async (req, res) => {
    try {
        const sistarum = await getBebApi()
        const stations = await selectAllStation()
        
        const data = []
        for (let i = 0; i < sistarum.length; i++) {
            const el = sistarum[i]
            for( let s = 0; s < stations.length; s++) {
                const st = stations[s]
                if(el.hardware_code == st.hardware_code) {
                    data.push({tma_value: el.tma_value, debit: el.debit, timestamp: el.timestamp, station: st})
                }
            }
        }
    
        return res.status(200).json(data)
        
    } catch (error) {
        res.status(400).send(error)
    }
    
}