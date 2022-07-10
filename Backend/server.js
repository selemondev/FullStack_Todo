const path = require('path');
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
if( process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../Frontend/FullStack_Todo/dist')))
    app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, '../', 'Frontend', 'FullStack_Todo', 'dist', 'index.html')))
} else {
    app.get('/', (req, res) => res.send('Please set to production'))
}
app.use(errorMiddleware);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});