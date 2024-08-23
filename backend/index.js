import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoute from './routes/auth.js';
import cookieParser from 'cookie-parser';
import userRoute from "./routes/users.js";
import postRoute from "./routes/posts.js";
import commentRoute from "./routes/comments.js";
import multer from "multer";
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected...');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

// Image handling
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "images")); 
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname); 
  }
});

const upload = multer({ storage: storage });

// Serve static files
app.use("/images", express.static(path.join(__dirname, "images"), {
  setHeaders: (res, path, stat) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.set('Access-Control-Allow-Credentials', 'true');
  }
}));

// Routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/comments", commentRoute);

// File upload route
app.post("/api/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  const imageUrl = `/images/${req.file.filename}`;
  console.log("imageUrl:......................................... " + imageUrl);
  // res.status(200).json({ message: "Image has been uploaded successfully!", imageUrl });
  res.status(200).json({ 
    message: "successfully!", 
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` 
});
});

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Start the server
connectDB().then(() => {
  app.listen(5000, () => {
    console.log('Server is running on port 5000');
  });
});
