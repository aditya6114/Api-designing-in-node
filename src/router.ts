import {Router} from 'express'
import { body, oneOf, validationResult } from "express-validator";
import { handleInputErrors } from './modules/middlewares';
import { createProduct, deleteProduct, getOneProduct, getProduct, updateProduct } from './handlers/product';
import { createUpdate, deleteUpdate, getOneUpdate, getUpdate, updateUpdate } from './handlers/update';

const router = Router()


//PRODUCT
router.get('/product',getProduct)
router.get('/product/:id',getOneProduct)

//adding validation to the route 
router.put('/product/:id',body('name').isString() , handleInputErrors,updateProduct)

router.post('/product',body('name').isString() , handleInputErrors,createProduct)
router.delete('/product/:id',deleteProduct)

//UPDATE 
router.get('/update',getUpdate)
router.get('/update/:id', getOneUpdate)
router.put('/update/:id',
body('title').optional(),
body('body').optional(),
body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']).optional(),
body('version').optional() ,
updateUpdate)
router.post('/update',
body('title').exists().isString(),
body('body').exists().isString(),
body('productId').exists().isString(),
createUpdate)
router.delete('/update/:id',deleteUpdate)

//UPDATE POINTS 
router.get('/updatepoint',()=>{})
router.get('/updatepoint/:id', ()=>{})
router.put('/updatepoint/:id', 
    body('name').optional().isString(), 
    body('description').optional().isString(),
    () => {}
  )
  router.post('/updatepoint', 
    body('name').isString(), 
    body('description').isString(),
    body('updateId').exists().isString(),
    () => {}
  )
router.delete('/updatepoint/:id',()=>{})

export default router
