require("dotenv").config();
const connectDB = require("./config/db");
const app = require("./main");

connectDB();

app.listen(5000, () => console.log("Server running on port 5000"));