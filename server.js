import express from 'express'
import userRoutes from './routes/api/users.js';
import clientRoutes from './routes/api/clients.js';
import meterRoutes from './routes/api/meters.js';
import contractRoutes from './routes/api/contracts.js';
import meteringRoutes from './routes/api/metering.js';


const app = express();

app.use(express.json())

app.get('/', (req, res) => {res.send('Api is running')})

app.use('/api/users', userRoutes)
app.use('/api/clients', clientRoutes)
app.use('/api/meters', meterRoutes)
app.use('/api/contracts', contractRoutes)
app.use('/api/metering', meteringRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));