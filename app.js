const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()
app.use(bodyParser.json())
app.use(cors())
app.use(express.static('build'))


morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :body :status :res[content-length] - :response-time ms'))



app.get("/api/persons", (req, res) => {
    Person
        .find({})
        .then(persons => persons.map(Person.format))
        .then(persons => res.json(persons))
        
})

app.post("/api/persons", (req, res) => {

    if (req.body.name === undefined) {
        return res.status(400).json({
            error: 'name missing'
        })
    }
    if (req.body.number === undefined) {
        return res.status(400).json({
            error: 'number missing'
        })
    }

    Person
        .find({})
        .then(persons => persons.map(Person.format))
        .then(persons => {
            if (persons.some(person => person.name === req.body.name)) {
                return res.status(400).json({
                    error: 'name must be unique'
                })
            }
        })

    const person = new Person({
        name: req.body.name,
        number: req.body.number,
    })
    person
        .save()
        .then(data => res.json(data));


})

app.get("/api/persons/:id", (req, res) => {
    Person
        .findById(req.params.id)
        .then(data => res.json(data))
        .catch(err => res.status(404).end())
})

app.delete("/api/persons/:id", (req, res) => {
    Person
        .deleteOne({
            _id: req.params.id
        })
        .then(() => res.status(204).end())
})

app.get("/info", (req, res) => {
    Person
        .find({})
        .then(data => res.send(`
            <p>puhelinluettelossa ${data.length} henkilön nimet</p>
            <p>${new Date()}</p>
        `))


})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})