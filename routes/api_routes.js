const router = require('express').Router();
const { v4: generateID } = require('uuid');
const fs = require('fs/promises');

let data; // Define data variable outside the functions

async function getData() {
    const jsonData = await fs.readFile('./db/users.json', 'utf8');
    return JSON.parse(jsonData);
}

// Initialize data when the server starts
getData().then((jsonData) => {
    data = jsonData;
}).catch((error) => {
    console.error('Error reading data:', error);
});

router.get('/users', (requestObj, responseObj) => {
    const nameQuery = requestObj.query.name?.toLowerCase();
    if (nameQuery) {
        const user = data.find(uObj => uObj.name.toLowerCase() === nameQuery);
        return responseObj.json(user);
    }
    responseObj.json(data);
});

router.get('/users/:id', (requestObj, responseObj) => {
    const paramId = requestObj.params.id;
    const user = data.find(uObj => uObj.id == paramId);
    responseObj.json(user || { message: 'User not found' });
});

router.post('/users/form', (requestObj, responseObj) => {
    console.log(requestObj.body);
    responseObj.redirect('/');
});

router.post('/users', async (requestObj, responseObj) => {
    const id = generateID();
    const newData = await getData();
    newData.push({
        ...requestObj.body,
        id: id
    });
    await fs.writeFile('./db/users.json', JSON.stringify(newData, null, 2));
    data = newData; // Update the data variable
    responseObj.json({ message: 'User has been added!' });
});

router.delete('/users/:id', async (requestObj, responseObj) => {
    const users = await getData()
    const id = requestObj.params.id

    const filterd = users.filter(uObj => uObj.id !== id)


    if (users.length > filtered.length) {
        await fs.writeFile('./db/users.json', JSON.stringify(filtered, null, 2))

        return responseObj.json({
            message: 'User with id deleted!'
        })
    }


    responseObj.json({
        message: 'User with ID of ${id} deleted succesfully!'
    })

})

module.exports = router;

