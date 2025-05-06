import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import catalogRoutes from './routes/catalog.routes';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/videos',catalogRoutes);

const PORT = process.env.PORT || 3002;
const MONGO_URI = process.env.MONGO_URI || '';

mongoose.connect(MONGO_URI)
.then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
        console.log(`Catalog Service running on port ${PORT}`)
    })
})
.catch(err => console.error('MongoDB connection erro:',err));