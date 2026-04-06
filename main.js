const express = require("express");
const app = express();

app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/records", require("./routes/recordRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));

const errorMiddleware = require("./middleware/errorMiddleware");
app.use(errorMiddleware);

const { apiLimiter } = require("./middleware/rateLimiter");

// Apply to all routes
app.use("/api", apiLimiter);
     
module.exports = app;