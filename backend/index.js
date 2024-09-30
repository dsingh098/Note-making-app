require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyparser = require('body-parser')
const noteRoutes = require('./routes/noteroute.js')


const app = express()

const PORT = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(bodyparser.json());

// connect db 
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => console.log('MongoDB connection error:', err));


//  use route 

app.use('/api', noteRoutes)

// start the server 
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})