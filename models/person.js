const mongoose = require('mongoose')

const url = 'mongodb://fullstack:salainenfullstack123@ds151292.mlab.com:51292/fullstack-persons'

mongoose.connect(url, {useNewUrlParser: true})


const PersonSchema = new mongoose.Schema({
    name: String,
    number: String
})


PersonSchema.statics.format = function(person) {
    return {
        name: person.name,
        number: person.number,
        id: person._id
    }
}

const Person = mongoose.model('Person', PersonSchema)



module.exports = Person