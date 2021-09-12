import express from 'express'
import userRoutes from './routes/api/users.js';
import clientRoutes from './routes/api/clients.js';


const app = express();

app.use(express.json())

app.get('/', (req, res) => {res.send('Api is running')})

app.use('/api/users', userRoutes)
app.use('/api/clients', clientRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));