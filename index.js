// CHAPTER 1: Setup webserver

// 0. npm install express
// 1. require express
// 2. Make an app object 
// 3. Set some config vars
// 4. Get the app to listen to you
// TEST: run in node
// 5. npm install -g nodemon (if not installed already)
// 6. Start app with nodemon (so it restarts when you change the code)

// CHAPTER 2: My first route
// 7. Start app with nodemon
// 8. Make a route with app.get(path, callback)
// TEST: make a request to your route, it should timeout 
// (because we dont return a response)
// 9. In your callback, return a response
// app.get(path, (request, response ) => { return response.send('hi') })
// 10. Define a variabl with some data, 
// use response.json() to test if you can send data back

// CHAPTER 3: Posting Lions
// 11. Make a post route
// 12. Return a response
// 13. Test with httpie 
// httpie command: http POST :4000/lions name="Nala"
// 14. Setup body parser
// 15. post a lion using httpie
// http POST :4000/lions name="Nala" age:=5

// 1
const express = require('express')
// 14
const bodyParser = require('body-parser')


// 2
const app = express()
// 14 
app.use(bodyParser.json())

// 3 
const port = 4000

const lions = [{
    name: 'Simba', age: 4,
}, {
    name: 'Mufasa', age: 32
}]

// 4
app.listen(port, () => {
    console.log('Waaah  MmmgetJAAAAA' )
    console.log('Mnjahanaaaa')
    console.log(`App listening on port ${port}`)
})


// app get / 
app.get('/', (request, response) => {
    // console.log(request) // we can get info from the request
    return response.status(200).send('Everything the light touches, is our kingdom, Simba')
})

// httpie command: http :4000/lions
// get /lions
app.get('/lions', (request, response) => {
    // 
    return response.status(200).json(lions)
})

app.get('/supportchats', (request, response) => {
    // 
    return response.status(200).json(lions)
})

// httpie command: http POST :4000/lions name="Nala"
// http POST :4000/lions name="Nala" age:=5
// post /lions
app.post('/lions', (request, response) => {
    // logging request body to see 
    console.log(request.body)
    // add to array
    lions.push(request.body)
    // check if it worked
    console.log(lions)

    // return correct response and object that was created
    return response.status(201).send(request.body)
})

