import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import http from 'http';
import { Server } from 'socket.io';
import connectDB from './Config/db_config.js';

import userRoutes from './Routes/userRoutes.js';
import authRoutes from './Routes/authRoutes.js';
import listingRoutes from './Routes/listingRoutes.js';
import appraisalRoutes from './Routes/AppraisalRoutes.js';
import contactRoutes from './Routes/contactRoutes.js';
import bookingRoutes from './Routes/bookingRoutes.js';


dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// HTTP server for Socket.IO
const server = http.createServer(app);

// Socket.IO setup
const io = new Server(server, {
  cors: {
    origin: ['http://127.0.0.1:5500', 'http://localhost:5500'],
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Middleware
app.use(cors({
  origin: ['http://127.0.0.1:5500', 'http://localhost:5500'],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Make io accessible in routes
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Routes
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/listing', listingRoutes);
app.use('/api/appraisal', appraisalRoutes(io)); // Pass io
app.use('/api/contact', contactRoutes);
app.use('/api',bookingRoutes);

// Socket.IO connection
io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id);
  socket.join('admins'); // For admin notifications

  socket.on('disconnect', () => {
    console.log('Socket disconnected:', socket.id);
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
