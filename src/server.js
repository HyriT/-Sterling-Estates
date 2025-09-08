
import dotenv from 'dotenv'; 
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import http from 'http'; 
import { Server } from 'socket.io'; 
import connectDB from './Config/db_config.js';

import authRoutes from './Routes/authRoutes.js';


dotenv.config(); 
connectDB();

const app = express();
const port = 5000;

// Create HTTP server for WebSocket
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
  origin: ['http://127.0.0.1:5500', 'http://localhost:5500'],
    methods: ['GET', 'POST'],
    credentials: true
  },
});
app.use(cors({
  origin: ['http://127.0.0.1:5500', 'http://localhost:5500'],
  credentials: true
}));

app.use((req, res, next) => {
  req.io = io;
  next();
});

// Middleware
app.use(express.json());
app.use(cookieParser());

//routes
app.use('/api/auth', authRoutes);


// Conection with WebSocket
io.on('connection', (socket) => {
  console.log('Admin connected:', socket.id);

  socket.join('admins');

  socket.on('disconnect', () => {
    console.log('Admin disconnected:', socket.id);
  });
});

// Start server
server.listen(port, () => {
  console.log(` Server is running on http://localhost:${port}`);
});

