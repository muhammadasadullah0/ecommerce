import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDb from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoutes.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartroute.js'
import orderRouter from './routes/orderRoute.js'

// App Config

const app = express()
const port = process.env.PORT || 4000
connectDb()
connectCloudinary()

// Middleware

app.use(express.json())
app.use(cors())

// Api endPoints

app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)
app.get('/', (req,res)=>{
    res.send('API is running...')
})

app.listen(port, ()=> console.log(`Server started on PORT : ${port}`))