import DebitModel from "../models/debit.js";

export const insertDebit = async (payload) => {
    const data = await DebitModel.create(payload)
    return data
}