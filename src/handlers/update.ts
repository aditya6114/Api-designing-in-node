//THIS FILE CONTAINS ALL THE FUNCTIONS THAT WOULD BE USED IN ROUTES in order to maintain the crud of the application 

import prisma from "../db"


//get All updates
export const getUpdate = async (req,res)=>{
    const products=  await prisma.product.findMany({
        where : {
            belongsToId : req.user.id
        },
        include:{
            updates : true
        }
    })

    const updates = products.reduce((allUpdates , product) =>{
        return [...allUpdates , ...product.updates]
    },[])
    res.json({data : updates})
}



export const getOneUpdate = async (req,res) =>{
    const update = await prisma.update.findUnique({
        where : {
            id : req.params.id
        }
    })

    res.json ( {data:update})
}

export const createUpdate = async(req,res)=>{
    const product = await prisma.product.findUnique({
        where:{
            id: req.body.productId
        } 

    })

    if (!product){
        return res.json({messages: 'no prod'})
    }
        
    else{
        const update = await prisma.update.create({
            data : {
                title : req.body.title , 
                body : req.body.body,
                //the below line helps maintaining relation between the product and the update schemas  
                product : {connect : {id : product.id}}
            }
        })
        res.json({data:update})
    }
}

export const updateUpdate = async (req,res)=>{
    const products = await prisma.product.findMany({
        where : {
            belongsToId:req.user.id,
            
        },
        include:{updates:true}
    })

    const updates = products.reduce((allUpdates , product) =>{
        return [...allUpdates , ...product.updates]
    },[])

    const match = updates.find(update => update.id === req.params.id)

    if(!match){
        return    res.json({message : 'nope'})
    }
    
    const updatedUpdate = await prisma.update.update({
        where:{
            id:req.params.id,

        },
        data:req.body
        
    })

    res.json({data : updatedUpdate})
}

export const deleteUpdate = async(req,res) => {
    const products = await prisma.product.findMany({
        where : {
            belongsToId:req.user.id,
            
        },
        include:{updates:true}
    })

    const updates = products.reduce((allUpdates , product) =>{
        return [...allUpdates , ...product.updates]
    },[])

    const match = updates.find(update => update.id === req.params.id)

    if(!match){
        return    res.json({message : 'nope'})
    }

    const deleted = await prisma.update.delete({
        where : {
            id : req.params.id
        }
    })
    res.json({data:deleted})
}