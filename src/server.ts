import express from 'express'
import router from './router'
import morgan from 'morgan'
import { protect } from './modules/auth';
import { createUser, signin } from './handlers/user';

const app = express();

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//CUSTOM MIDDLEWARE 
app.use((req,res,next)=>{
  
  next()
})

app.get("/", (req, res) => {
  console.log('Hello from express')
  res.status(200)   
  res.json({message:'hello'})
});

//This shows a middleware function mounted on the /api path. The function is executed for any type of HTTP request on the /api/(whatever comes from router) path.
app.use('/api',protect, router)


app.post('/user',createUser)
app.post('/signin',signin)



export default app