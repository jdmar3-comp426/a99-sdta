const express = require('express');
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());

app.get('/', (request, response) => {
    response.send('Ping');
})


const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Connected to ${PORT}`);
})