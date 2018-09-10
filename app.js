const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())




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

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})