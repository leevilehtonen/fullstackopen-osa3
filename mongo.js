const mongoose = require('mongoose')

const url = 'mongodb://fullstack:salainenfullstack123@ds151292.mlab.com:51292/fullstack-persons'

mongoose.connect(url, {useNewUrlParser: true})

const Person = mongoose.model('Person', {
    name: String,
    number: String
})

if (process.argv.length <= 2) {
    console.log("puhelinluettelo:")
    Person
        .find({})
        .then(data => {
            data.forEach(person => {
                console.log(`${person.name} ${person.number}`)
            })
            mongoose.connection.close();
    })
} 

if (process.argv.length == 4) {
    const person = new Person({
        name: process.argv[2],
        number: process.argv[3]
    })
    person
        .save()
        .then(result => {
            console.log(`lisätään henkilö ${process.argv[2]} numero ${process.argv[3]} luetteloon`)
            mongoose.connection.close()
        })
}