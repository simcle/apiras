import axios from "axios";

export const getBebApi = async () => {
    try {
        const {data} = await axios.get('http://103.184.53.236/sistarum/bebapi')
        
        const response = setDebit(data.data)
        
        return response
        
    } catch (error) {
        return error
    }
}

const setDebit = (val) => {
    const data = val
    for (let i = 0; i < data.length; i++) {
        const el = data[i]
        let a = parseFloat(el.k1)
        let b = parseFloat(el.k2)
        let c = parseFloat(el.k3)
        let tma = parseFloat(el.tma_value).toFixed(2)
        const newDebit = callDebit (a, b, c , tma)
        data[i].tma_value = tma
        data[i].debit = parseFloat(newDebit.toFixed(2))
    }
    function callDebit (a, b, c, tma) {
        let q = (a * (tma ** 2)) + (b * tma) + c
        return q
    }
    return data
}
