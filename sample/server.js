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

app.use(bodyParser.text());


const server = app.listen(3000, () => {
  console.log("app is listening on port 3000");
  trySample();
});

function trySample (){
  fetch('https://bridge-eth-connector.kalp.network/evmKalp/readFromQueue', {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));


}

module.exports = { server };
