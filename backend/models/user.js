const mongoose = require('mongoose');

const url = `mongodb+srv://comp426:sdtapass@cluster0.hes6b.mongodb.net/426project?retryWrites=true&w=majority`;
console.log('Connecting to', url);

mongoose.connect(url).then(result => {
    console.log('Connected to mongoDB')
})
.catch((error) => {
    console.log(`error`);
})

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 3,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    interactions: [
        {
            _id: false,
            interactionDate: Date,
            interactionType: String
        }
    ]
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.password
    }
})

const User = mongoose.model('User', userSchema);
module.exports = User;