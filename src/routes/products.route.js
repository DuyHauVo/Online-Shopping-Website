import express from 'express'
import Products_Controller from '../app/controllers/productsController.js'

const router = express.Router(); 

router.get('/', Products_Controller.index); 
router.post('/Add_Product', Products_Controller.Add_Product); 
router.put('/Update_Product', Products_Controller.Update_Product);
export default router;