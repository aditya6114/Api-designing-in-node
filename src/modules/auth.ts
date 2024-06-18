import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

//function to compare the password in order for authentication 
export const comparePasswords =(pass,hash)=>{
    return bcrypt.compare(pass,hash)

}

///creating a hash for the pass
export const hashPass =(pass)=>{
    return bcrypt.hash(pass, 5)
}

export const createJWT = (user) =>{
    const token = jwt.sign({id:user.id,
        username:user.username},process.env.JWT_SECRET)
    return token
}

export const protect = (req,res,next) => {
    const bearer = req.headers.authorization
    if(!bearer){
        res.status(401)
        res.json({message: 'notauthorized'})
        return
    }

    const [,token] = bearer.split(' ')

    if(!token){
        res.status(401)
        res.json({message: 'notauthorized token'})
        return
    }
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload;
        console.log(payload);
        next();
        return;
      } catch (e) {
        console.error(e);
        res.status(401);
        res.send("Not authorized");
        return;
      }
    };
