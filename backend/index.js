const express = require("express")
const axios = require("axios")
const app = express()
const cors = require('cors')
const http = require('http').createServer(app)

app.use(express.json())

const courseRoute = require('./routes/course')

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('public'))
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true 
    }
    app.use(cors(corsOptions))
}

app.use("/api/course", courseRoute)

const port = process.env.PORT || 8800




http.listen(port, () => {
    console.log(`Backend server is running at port ${port}`);
})

