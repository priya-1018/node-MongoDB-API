import express from 'express';
import bodyParser from 'body-parser'
const app = express();
import userRoutes from './routes/users.js'
import connectToMongoDB from './db.js';

const PORT = 5000;

app.use(bodyParser.json());

app.use('/', userRoutes);

// app.get('/', (req, res) => res.send('HELLO FROM HOMEPAGE'))

// app.get('/', (req, res));

app.listen(PORT, () => {
    connectToMongoDB()
    console.log(`Server running on port: http://localhost:${PORT}`)


});