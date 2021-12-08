const express = require('express');
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());
const User = require('./models/user')

app.get('/', (request, response) => {
    response.send('Ping');
})

// TODO: Allow users to update their username or password

// Add an interaction to specified user (login or logout)
app.post('/app/interaction', async (request, response) => {
    try {
        const body = request.body;
        const user = await User.findById(body.userId);

        const newInteraction = {
            interactionDate: new Date(),
            interactionType: body.interactionType
        }

        user.interactions = user.interactions.concat(newInteraction);
        const newUser = await user.save();
        response.json(newUser);


    } catch (error) {
        response.status(500).json(error);
    }
})

// Login with existing user
app.post('/app/login', async (request, response) => {
    try {
        const body = request.body;
        const foundUser = await User.findOne({username: body.username});
        if (!foundUser || foundUser.password !== body.password) {
            return response.status(401).json({error: 'Incorrect credentials'})
        }

        response.json(foundUser);

    } catch (error) {
        response.status(500).json(error);
    }
})

// Create a new user - automatically add first interaction of "account created"
app.post('/app/users', async (request, response) => {
    try {
        const body = request.body;
        const newUser = new User({
            username: body.username,
            name: body.name,
            password: body.password
        })
        const firstInteraction = {
            interactionDate: new Date(),
            interactionType: "Account created"
        }
        newUser.interactions = newUser.interactions.concat(firstInteraction);
        const savedUser = await newUser.save();
        response.json(savedUser);    
    } catch (error) {
        response.status(500).json(error);
    }
})

// Get all users
app.get('/app/users', async (request, response) => {
    try {
        const body = request.body;
        const users = await User.find({});
        response.json(users);
    } catch (error) {
        response.status(500).json(error);
    }
})

// Get user by ID
app.get('/app/users/:id', async (request, response) => {
    try {
        const body = request.body;
        const user = await User.findById(request.params.id);
        response.json(user);
    } catch (error) {
        response.status(500).json(error);
    }
})

app.put('/app/users/:id', async (request, response) => {
    try {
        const body = request.body;
        const oldUser = await User.findById(request.params.id);
        oldUser.username = body.username;
        oldUser.password = body.password;
        const updateInteraction = {
            interactionType: "Updated account info",
            interactionDate: new Date()
        }
        oldUser.interactions = oldUser.interactions.concat(updateInteraction);
        const newUser = await oldUser.save();
        response.json(newUser);
    } catch (error) {
        response.status(500).json(error);
    }
})

// Delete user by ID
app.delete('/app/users/:id', (request, response) => {
    User.findByIdAndRemove(request.params.id).then(result => {
        response.status(204).end();
    })
})


const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Connected to ${PORT}`);
})