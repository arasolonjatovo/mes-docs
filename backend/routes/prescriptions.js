import express from "express";

import { createPrescription } from "../controllers/prescriptions.js";

const router = express.Router();

router.post("/new-prescription", createPrescription);

export default router;
