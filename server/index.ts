import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db'
import userRoutes from "./routes/users";
import sportRoutes from "./routes/sports";



dotenv.config()

const app = express();

app.use(cors());
app.use(express.json({ limit: "30mb"}));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
connectDB();
app.use('/users', userRoutes);
app.use('/sports', sportRoutes);


app.listen(process.env.PORT, () => console.log(`server is listening on port ${process.env.PORT}`));
