const express = require('express')
const path = require('path')


const app = express()
const api_routes = require('./routes/api_routes')

const PORT = 3333



app.use(express.static('./public'))


app.use(express.urlencoded({ extended: false }))


app.use(express.json())


app.use('/api', api_routes)



app.listen(PORT, () => {
    console.log('Server running on port', PORT)
})