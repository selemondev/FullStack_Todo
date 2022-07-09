const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const cors = require("cors");
const app = express();
const { errorMiddleware } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const goalRoutes = require("./routes/goalRoutes");
const PORT = process.env.PORT || 5000;
connectDB()
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(cors());
app.use("/api/auth", userRoutes);
app.use("/api/goals", goalRoutes);
app.use(errorMiddleware);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});