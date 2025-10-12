require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());

// ✅ Allow frontend (Vite React) to access backend
app.use(cors({
  origin: 'http://localhost:5173', // your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// ✅ Connect to MongoDB Atlas
connectDB();

// ✅ Basic health check route
app.get('/', (req, res) => {
  res.status(200).send('✅ API is running and connected to MongoDB');
});

// ✅ Import and use routes
const authRoutes = require('./routes/auth');
const quizRoutes = require('./routes/quizzes');

app.use('/api/auth', authRoutes);
app.use('/api/quizzes', quizRoutes);

// ✅ Global Error Handler (optional, good practice)
app.use((err, req, res, next) => {
  console.error('🔥 Server Error:', err.stack);
  res.status(500).json({ msg: 'Internal Server Error' });
});

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
});
