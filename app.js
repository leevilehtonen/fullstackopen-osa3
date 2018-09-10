const express = require('express')

const app = express()


const persons = [
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
    }
]


app.get("/api/persons", (req, res) => {
    res.json(persons);
})

app.get("/api/persons/:id", (req, res) => {
    const person = persons.find(note => note.id === Number(req.params.id))
    person ? res.json(person) : res.status(404).end()
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