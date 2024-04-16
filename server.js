const express = require('express')
const path = require('path')


const app = express()
const PORT = 3333

const data = [
    {
        id: 234,
        name: 'JD',
        age: 44
    },
    {
        id: 1002, 
        name: 'Bob',
        age: 99
    },
    {
        id: 555,
        name: 'Sarah',
        age: 40
    }
]


app.use(express.static('./public'))

//Get api route to send back the array of users
app.get('/api/users', (requestObj, responseObj) => {
    responseObj.json(data)
})

app.get('/api/users/:id', (requestObj, responseObj) => {
    const paramId = requestObj.params.id

    const user = data.find(uObj => uObj.id == paramId)
    responseObj.json(user || { message: 'User not found'})
})

// app.get('/', (requestObj, responseObj) => {
//     responseObj.sendFile(path.join(__dirname, './public/index.html'))
// })

app.get('/api/:user_id', (requestObj, responseObj) => {
    const id = 1

    const user = data.find((userObj) => {
        if (userObj.id == id) return true
    })

    if (user) {
        return responseObj.json(user)
    }

    return responseObj.json({
        message: 'User not found'
    })

    console.log(user)

})

app.get('/about', (requestObj, responseObj) => {
    responseObj.send('<h1>About header</h1>')

})

app.get('/data', (requestObj, responseObj) => {
    const queryParams = requestObj.query

    // Create an empty object
    const obj = {}

    // If they request the name (name: 'true'), then we add the property name to the object
    if (queryParams.name === 'true') {
        obj.name = 'JD'
    }

    // If they request the age
    if (queryParams.age === 'true') {
        obj.age = 44
    }



    responseObj.json(obj)
})

app.listen(PORT, () => {
    console.log('Server running on port', PORT)
})