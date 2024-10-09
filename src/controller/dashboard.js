import { getBebApi } from "../services/sistarumService.js"

export const getData = async (req, res) => {
    try {
        const result = await getBebApi()
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
                        'k1': el.k1,
                        'k2': el.k2,
                        'k3': el.k3,
                        'debit': el.debit
                    }
                }
            )
        }
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
        res.status(400).send('Error')   
    }

}