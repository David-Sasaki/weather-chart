import express from "express";
import dotenv from "dotenv";
import { setupMiddleware } from "./config/middleware";
import { connectDatabase } from "./config/database";

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 5000);

// Middleware Setup
setupMiddleware(app);

// Database Connection Setup
connectDatabase();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
