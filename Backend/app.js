const userRoutes = require('./routes/user.routes')
const express = require("express")
const cookieParser = require('cookie-parser')
const cors = require('cors')
const app = express()

app.use(cookieParser())
app.use(cors())

app.get('/',(res,req)=>{
    res.setEncoding("hello World")
})
app.use(express.json());
app.use('/users',userRoutes)



module.exports =app