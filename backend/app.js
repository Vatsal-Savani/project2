const express = require("express");

const { router } = require("./routes/employee.route");
const cookieParser = require("cookie-parser");
// const bodyParser = require("body-parser");

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use("/", router);

app.listen(3001, () => {
  console.log("server connected");
});
