const express = require("express");
const cors = require("cors");
const DBconnection=require("./DB/connection.js");
const appRouter=require("./routes/app.router");
require("dotenv").config();
const app = express();
app.use(cors());
 app.use(express.json());
appRouter(app);

DBconnection();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
