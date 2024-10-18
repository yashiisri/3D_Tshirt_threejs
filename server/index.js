import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import geminiRoutes from './routes/gemini.routes.js'; // Make sure the path is correct

dotenv.config();

const app = express();

// Setup CORS (Adjust origin for production)

app.use(cors({
  origin: 'http://localhost:3000', // Set the origin to your frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // List the allowed methods
  credentials: true // If you're sending cookies or using authentication
}));

// Setup JSON body parser with large payload limit
app.use(express.json({ limit: "50mb" }));

// Use Gemini routes
app.use("/api/v1/gemini", geminiRoutes);

// Basic route to check if the server is running
app.get('/', (req, res) => {
  res.status(200).json({ message: "Hello from Gemini" });
});

// Error handling for unhandled routes
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Optional global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
