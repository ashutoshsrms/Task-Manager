const express = require("express");
const connectDB = require("./config/database");
const errorHandler = require("./middlewares/errorHandler");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");
const app = express();

require("dotenv").config();

connectDB();

app.use(express.json());

app.use("/api", userRoutes);
app.use("/api/users/:userId", taskRoutes);

app.use(errorHandler);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

