import express from "express"; 
import RequestController from "../app/controllers/RequestController.js";

const router=express.Router();

router.get('/',RequestController.getAllReq);
router.post('/Add_Request', RequestController.Add_Request);
router.get('/:id',RequestController.getDetail);

export default router