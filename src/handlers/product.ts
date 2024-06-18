import prisma from "../db"


//get All products 
export const getProduct = async (req,res)=>{
    const user =  await prisma.user.findUnique({
        where : {
            id : req.user.id

        },
        include:{
            Product : true
        }
    })
    res.json({data : user.Product})
}

export const getOneProduct = async (req,res) =>{
    const id = req.params.id
}