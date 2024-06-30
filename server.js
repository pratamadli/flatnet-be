require("dotenv").config();
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const { sequelize } = require("./models");
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());

app.use(cors());

app.use("/api", routes);

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  try {
    await sequelize.authenticate();
    console.log("Database connected!");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
