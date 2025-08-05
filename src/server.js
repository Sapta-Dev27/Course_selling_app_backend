import express from 'express';
import 'dotenv/config';
import db from './db/db.js';
import userRoutes from './routes/user.js';

const PORT = process.env.PORT|| 8000;

const app = express();
app.use(express.json());

db();
app.use('api/v1/user', userRoutes);

app.listen(PORT , () => {
  console.log(`Server is running on ${PORT}`);
})