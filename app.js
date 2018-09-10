const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
app.use(bodyParser.json())
app.use(cors())
app.use(express.static('build'))


morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :body :status :res[content-length] - :response-time ms'))


let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Martti Tienari",
        "number": "040-123456",
        "id": 2
    },
    {
        "name": "Arto Järvinen",
        "number": "040-123456",
        "id": 3
    },
    {
        "name": "Lea Kutvonen",
        "number": "040-123456",
        "id": 4
    },
    {
        "name": "Tester",
        "number": "040-123456",
        "id": 5
    }
]


app.get("/api/persons", (req, res) => {
    res.json(persons);
})

app.post("/api/persons", (req, res) => {

    if (req.body.name === undefined) {
        return res.status(400).json({error: 'name missing'})
    }
    if (req.body.number === undefined) {
        return res.status(400).json({error: 'number missing'})
    }
    if (persons.some(person => person.name === req.body.name)) {
        return res.status(400).json({error: 'name must be unique'})
    }

    const person = {
        name: req.body.name,
        number: req.body.number,
        id: Math.round(Math.random()*1000000)
    }
    persons = persons.concat(person)
    res.json(person);
})

app.get("/api/persons/:id", (req, res) => {
    const person = persons.find(note => note.id === Number(req.params.id))
    person ? res.json(person) : res.status(404).end()
})

app.delete("/api/persons/:id", (req, res) => {
    persons = persons.filter(note => note.id !== Number(req.params.id))
    res.status(204).end()
})

app.get("/info", (req, res) => {
    res.send(`
        <p>puhelinluettelossa ${persons.length} henkilön nimet</p>
        <p>${new Date()}</p>
    `)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})