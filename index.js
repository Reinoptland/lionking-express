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

// CHAPTER 4: DB and Sequelize
// 16. Install sequelize: npm install sequelize
// 17. Require sequelize
// 18. Connect db and initialize Sequelize
// const sequelize = new Sequelize('postgres://postgres:secret@localhost:5432/postgres');
// 19. Install pg package: npm install pg
// 20. Define a Model
// 21. sync the database (connect to the database, and create the tables)

// CHAPTER 5: Start database (optional)
// a. Start docker deamon
// b. Create container with postgres
// docker run -p 5432:5432 --name some-postgres -e POSTGRES_PASSWORD=secret -d postgres
// if exists: Conflict. The container name "/some-postgres" is already in use by container "e85d963277d97fa704f54fe0076b37e1cfaa2eb327ac0a96df4d1d3d12cb981c".
// in that case restart: 
// docker restart e85d963277d97fa704f54fe0076b37e1cfaa2eb327ac0a96df4d1d3d12cb981c
// c. Check if tables are created successfully in DBeaver or Postico
// DON'T FORGET TO REFRESH POSTICO / DBEAVER

// CHAPTER 6: Create a lion (for real this time)
// 22. Use th Lion model with the create method to create a Lion
// Lion.create(request.body)
// 23. Use .then to get the result and return a response (201) with result from the database
// 24. Handle errors



// 17
const Sequelize = require('sequelize');
// 18 connection string: 'postgres://postgres:secret@localhost:5432/postgres'
const sequelize = new Sequelize('postgres://postgres:secret@localhost:5432/postgres');

// 20
const Lion = sequelize.define('lion', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    age: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

sequelize.sync()
    .then(() => console.log('Tables created successfully'))
    .catch(err => {
        console.error('Unable to create tables, shutting down...', err);
        process.exit(1); // crash program
    })

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

// httpie command: http POST :4000/lions name="Nala"
// http POST :4000/lions name="Nala" age:=5
// post /lions
app.post('/lions', (request, response) => {
    // logging request body to see 
    console.log(request.body)

    // 22
    // Create Lion using request body
    Lion.create(request.body)
        // 23
        .then(result => { 
            console.log(result.dataValues)

            // Return the response with the result from the database
            // We don't need to specify datavalues or anything
            // Because of sequelize magic?
            return response.status(201).json(result)
        })
        // Catch errors if the database cannot store the lion
        // 24
        .catch(error => {
            // Specify what went wrong
            if(error.name === "SequelizeUniqueConstraintError"){
                return response.status(422).send({ message: 'Name already exists, sorry :('})
            } else {
                return response.status(400).send({ message: 'Something went wrong, Hakuna Matata'})
            }
        })
    // check if it worked
    // console.log(lions)

    // If we would send the response here, we would send it before the data is stored :(
    // DONT
    // return response.status(201).send(request.body)
})

