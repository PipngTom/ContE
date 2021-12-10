import express from 'express'
import dotenv from 'dotenv';
import userRoutes from './routes/api/users.js';
import clientRoutes from './routes/api/clients.js';
import meterRoutes from './routes/api/meters.js';
import contractRoutes from './routes/api/contracts.js';
import meteringRoutes from './routes/api/metering.js';
import mrezarinaRoutes from './routes/api/mrezarina.js';
import faktureRoutes from './routes/api/fakture.js';
import emsRoutes from './routes/api/ems.js';
import nametiRoutes from './routes/api/nameti.js';
import euroRoutes from './routes/api/euro.js';

dotenv.config()

const app = express();

app.use(express.json())

app.get('/', (req, res) => {res.send('Api is running')})

app.use('/api/users', userRoutes)
app.use('/api/clients', clientRoutes)
app.use('/api/meters', meterRoutes)
app.use('/api/contracts', contractRoutes)
app.use('/api/metering', meteringRoutes)
app.use('/api/mrezarina', mrezarinaRoutes)
app.use('/api/fakture', faktureRoutes)
app.use('/api/ems', emsRoutes)
app.use('/api/nameti', nametiRoutes)
app.use('/api/kurs', euroRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));