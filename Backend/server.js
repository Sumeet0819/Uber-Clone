require('dotenv').config();
const http =require("http")
const app = require('./app')
const connectDB = require('./db/db')

const port = process.env.PORT || 3000

const server = http.createServer(app)
connectDB()


server.listen(port, () =>{
    console.log("server running on ", port);
    
})