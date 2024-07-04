const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/cbt_eventplanner360', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

app.get('/', (req, res) => {
    res.send('Welcome to CBT EventPlanner360 API');
});

const eventRoutes = require('./routes/events');
app.use('/api/events', eventRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
