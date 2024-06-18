import {Router} from 'express'
import { body, oneOf, validationResult } from "express-validator";
import { handleInputErrors } from './modules/middlewares';

const router = Router()


//PRODUCT
router.get('/product',(req,res)=>{
    res.json({message:'message'})
})
router.get('/product/:id', ()=>{

})

//adding validation to the route 
router.put('/product/:id',body('name').isString() , handleInputErrors,(req,res)=>{})

router.post('/product',body('name').isString() , handleInputErrors,(req,res)=>{})
router.delete('/product/:id',()=>{})

//UPDATE 
router.get('/update',()=>{})
router.get('/update/:id', ()=>{})
router.put('/update/:id',
body('title').optional(),
body('body').optional(),
body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']).optional(),
body('version').optional() ,
()=>{})
router.post('/update',
body('title').exists().isString(),
body('body').exists().isString(),
body('productId').exists().isString(),
()=>{})
router.delete('/update/:id',()=>{})

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
