// const express = require('express')// method-1
import express from "express"; // method-2
import dotenv from "dotenv"; 
import connectDB from "./config/database.js";
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app,server } from "./socket/socket.js";
dotenv.config({});
import path from "path";
import { existsSync } from "fs";
 
const PORT = process.env.PORT || 5000;
const _dirname = path.resolve();

// middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json()); 
app.use(cookieParser());
const corsOption={
    origin:'http://localhost:3000',
    credentials:true
};
app.use(cors(corsOption)); 

// routes
app.use("/api/v1/user",userRoute); 
app.use("/api/v1/message",messageRoute);

// Serve static files from frontend build directory
const frontendBuildPath = path.join(_dirname, "frontend", "build");
const frontendDistPath = path.join(_dirname, "frontend", "dist");

// Check which build directory exists (build or dist)
let staticPath = frontendBuildPath;
let indexPath = path.join(frontendBuildPath, "index.html");

// Try to use build directory first (React default), fallback to dist
if (!existsSync(staticPath)) {
    if (existsSync(frontendDistPath)) {
        staticPath = frontendDistPath;
        indexPath = path.join(frontendDistPath, "index.html");
    }
}

// Only serve static files if the directory exists
if (existsSync(staticPath)) {
    app.use(express.static(staticPath));
    app.get('*', (_, res) => {
        res.sendFile(indexPath);
    });
} else {
    // Fallback: if no build directory exists, just serve API routes
    console.warn(`Warning: Frontend build directory not found at ${staticPath}. Only API routes will be available.`);
    app.get('/', (_, res) => {
        res.json({ message: 'Backend API is running. Frontend build not found.' });
    });
}

server.listen(PORT, ()=>{
    connectDB();
    console.log(`Server listen at prot ${PORT}`);
});

