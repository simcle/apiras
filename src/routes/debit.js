import express from "express";

import { debitInsert } from "../controller/debit.js";

const debitRouter = express.Router()

debitRouter.post('/', debitInsert)

export default debitRouter;