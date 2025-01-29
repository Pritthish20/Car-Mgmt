import express from 'express';

import { allProducts, createProduct,deleteProduct,specificProduct,updateProduct, } from '../controllers/carsControllers.js';
import {auth} from '../middlewares/authMiddlware.js'

const router=express.Router();

router.post('/create',auth,createProduct);
router.put('/update/:carId',auth,updateProduct);
router.get('/all',auth,allProducts)
router.get('/:carId',auth,specificProduct)
router.delete('/delete/:carId',auth,deleteProduct) 


export default router;