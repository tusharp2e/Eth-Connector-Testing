require("dotenv").config();
const express = require("express");
const app = express();

const session = require("express-session");
const bodyParser = require("body-parser");
// const { Network, submitTransaction, evaluateTransaction } = require("kalp-wallet-ts");
const { Network, submitTransaction, evaluateTransaction } = require("test-kalp-wallet-package");

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
  console.log("app is listening on port " + process.env.PORT);
  console.log("CHAIN_ID " + process.env.CHAIN_ID);
  WriteTxToKalpChain();
});

WriteTxToKalpChain = async () => {
  try {
    console.log("Before WriteTxToEVMChain");
    // const invokerId = "7aaf07011bf81043918b214b3b592ed067dd6f21";
    // const privateKeyString = "-----BEGIN PRIVATE KEY-----\nMEECAQAwEwYHKoZIzj0CAQYIKoZIzj0DAQcEJzAlAgEBBCA6Nf1kiSi9QZ9dWXfI\ncSw6ISdmpqT37vPoyTC1JNAVYg==\n-----END PRIVATE KEY-----";
    // const cert = "-----BEGIN CERTIFICATE-----\nMIIDdTCCAxugAwIBAgIUTRSaD47n+B8AtN+5rphueZWNJxAwCgYIKoZIzj0EAwIw\ngbgxCzAJBgNVBAYTAlVTMREwDwYDVQQIEwhEZWxhd2FyZTFQME4GA1UEBxNHUDJF\nIExBQlMgTExDICAxMDA3IE4gT3JhbmdlIFN0LiA0dGggRmxvb3IgU3RlIDEzODIg\nV2lsbWluZ3RvbiBVLlMgMTk4MDExETAPBgNVBAoTCE1BSSBMYWJzMQ8wDQYDVQQL\nEwZjbGllbnQxIDAeBgNVBAMTF2thbHBzdGFnZW5ldDEtaW50LWFkbWluMB4XDTI0\nMDQwMzA3NDIwMFoXDTI2MDEwNTE3NTYwMFowgcMxCzAJBgNVBAYTAklOMRYwFAYD\nVQQIEw1Zb3VyIFByb3ZpbmNlMRYwFAYDVQQHEw1Zb3VyIExvY2FsaXR5MRowGAYD\nVQQKExFZb3VyIE9yZ2FuaXphdGlvbjE1MA0GA1UECxMGY2xpZW50MA4GA1UECxMH\nY2xpZW50czAUBgNVBAsTDWthbHBzdGFnZW5ldDExMTAvBgNVBAMTKDdhYWYwNzAx\nMWJmODEwNDM5MThiMjE0YjNiNTkyZWQwNjdkZDZmMjEwWTATBgcqhkjOPQIBBggq\nhkjOPQMBBwNCAARIN4oJv77n3St7SD3KEuMvHDtegPfFuaNwdp95T1yevL0rBSRr\nGFRURg+1EKUxvsD0C8etFLh+EiZyDQzufTxMo4H1MIHyMA4GA1UdDwEB/wQEAwIH\ngDAMBgNVHRMBAf8EAjAAMB0GA1UdDgQWBBRBL3klrNCEvl6WiR6aZGzpZPq50jAf\nBgNVHSMEGDAWgBRcR4QSSVDgTfN5sy2w8Rp4bYOjVzCBkQYIKgMEBQYHCAEEgYR7\nImF0dHJzIjp7ImhmLkFmZmlsaWF0aW9uIjoia2FscHN0YWdlbmV0MS5jbGllbnRz\nIiwiaGYuRW5yb2xsbWVudElEIjoiN2FhZjA3MDExYmY4MTA0MzkxOGIyMTRiM2I1\nOTJlZDA2N2RkNmYyMSIsImhmLlR5cGUiOiJjbGllbnQifX0wCgYIKoZIzj0EAwID\nSAAwRQIhAOBS5YJUU+urXbwjub1ZHyzUGiB0w7btPSV2L29njVKJAiAYrYRYPeCc\nyRBoLns/BBRX7flpOEHl2qa7A+Bb/jr7og==\n-----END CERTIFICATE-----\n";
    const invokerId = process.env.INVOKER_ID;
    const privateKeyString = process.env.PRIVATE_KEY_STRING;
    const cert = process.env.CERT;

    console.log("Inputs->", invokerId, "\t", privateKeyString, "\t", cert, "\t");
    console.log("channel----------->", process.env.KALP_ENV_CHANNEL);
    console.log("localconstants.chaincode----------->", process.env.KALP_CONTRACT);
    console.log("Network->", Network.Stagenet);
    const randomQueueId = "testqueue" + Date.now();
    console.log(randomQueueId)
    const params = JSON.stringify({"queueId": randomQueueId})
    const result = await evaluateTransaction(
      Network.Stagenet,
      invokerId,
      privateKeyString,
      cert,
      "kalp",
      "testing_kalpstore_newcc",
      "UpdateTxRecord",
      ["MOCKETH5", params]
    );

    // ["MOCKETH34","{\"retryCount\":5}"]
    console.log("Endorse Success", result);
    const makeTransaction = await submitTransaction(
      Network.Stagenet,
      invokerId,
      privateKeyString,
      cert,
      "kalp",
      "testing_kalpstore_newcc",
      "UpdateTxRecord",
      ["MOCKETH5", params]
    );
    const output = JSON.stringify(makeTransaction);
    console.log(`transaction data2: ${makeTransaction}`);
    console.log("Successful!");
  } catch (error) {
    console.log(error);
    console.error(`Error at WriteTxToEVMChain: ${error.message}`);

    // response.generateErrorResponse(res, error.statusCode || 500, error);
    return;
  }
};


module.exports = { server };
