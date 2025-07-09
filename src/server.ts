import express from 'express';
import session from 'express-session';
import passport from './lib/passportConfig';
import cors from 'cors';
import cookieParser from "cookie-parser";
import prisma from '../src/prismaClient'; // Import Prisma Client
import initializeSocket from './socket'; // Import Socket Initialization

import { PORT } from "./lib/config";

import userRoutes from './routes/userRoutes';

const app = express();

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.use(cookieParser()); // Parse cookies

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge:  24* 60 * 60 * 1000, 
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/users', userRoutes);


app.use('/api/users', userRoutes);

// Initialize Socket.IO
const { io, events,server } = initializeSocket(app);
// Export the Socket.IO instance for use in other modules
export { io };



if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app; // 👈 حتى نستخدمه في Supertest