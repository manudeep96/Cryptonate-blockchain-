const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const routes = require("./routes/routes");
// Connect to mongodb
const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString);
const database = mongoose.connection;
database.on("error", (e) => console.log(e));
database.once("connected", () => {
  console.log("Database connected");
});
// Start server
const app = express();
const PORT = 3000;

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});

app.use("/api", routes);
