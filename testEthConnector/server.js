const express = require("express");
const app = express();

const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");

const { Agent, setGlobalDispatcher } = require("undici");
const agent = new Agent({
  connect: {
    rejectUnauthorized: false,
  },
});

setGlobalDispatcher(agent);

app.use(express.json());
app.use(cors());
app.use(session({ secret: "Secret_Key" }));
require("dotenv").config();

app.use(bodyParser.text());

const thirdwebRoute = require("./routes/thirdwebRoute.js");

app.use("/thirdweb", thirdwebRoute);

const server = app.listen(3001, () => {
  console.log("app is listening on port 3001");
});

module.exports = { server };
