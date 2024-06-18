//THIS FILE AND SPECIFICALLY THIS FOLDER ALLOW US TO MANUPLATE AND PLAY WITH DATABASE 

import prisma from "../db";
import { comparePasswords, createJWT, hashPass } from "../modules/auth";


//creating a new user 
export const createUser = async(req,res) =>{ 
    const user  =await prisma.user.create({
        data:{
            //assuming that the username comes with the request 
            username: req.body.username,
            password: await hashPass(req.body.password)
        }
    })

    const token = createJWT(user)
    res.json({token})

}

export const signin = async (req, res) => {
    const user = await prisma.user.findUnique({
      where: { username: req.body.username },
    });
  
    const isValid = await comparePasswords(req.body.password, user.password);
  
    if (!isValid) {
      res.status(401);
      res.send("Invalid username or password");
      return;
    }
  
    const token = createJWT(user);
    res.json({ token });
  };