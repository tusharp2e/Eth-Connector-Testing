require('dotenv').config({ path: '../../../.env' });
const express = require("express");
const router = express.Router();
const { read, writeViaSDK, writeViaSDKForTPS, writeViaCall, webhook } = require("../controllers/thirdwebController.js");
const { getLatestBlockNumber } = require("../../../utils/thirdwebHelper.js");
const {
  invokeEVMHandleBridgeToken,
  invokeRollBackTransaction,
  setGiniAddress,
  fetchEventsFromBlockToLatest,
  cancelStuckTransaction,
} = require("../../../services/thirdwebService.js");
const { createTxRecordKalpStore, updateKalpStoreTxStatus, getTransactionExists } = require("../../../services/kalpStoreService.js");
const { getLastUnprocessedTx } = require("../../../services/kalpStoreService.js");
const queue = require("../../../utils/localQueue.js");
const { POLYGON_CHAIN, KALP_CHAIN, EVENT_READ_BY_ETH, EVENT_READ_BY_KALP_MIDDLEWARE, TX_SUCCESS } = require("../../../lib/constants.js");

// Example to read from EVM
router.get("/read", read);

// Example to read events from BlockNumber to BlockNumber
router.get("/getEventsOrWriteChain", (req, res) => {
  // cancelStuckTransaction()
  fetchEventsFromBlockToLatest(req.body.blockNumber);
  res.send("Get Events!");
});

// To test InvokeEVMHandleBridgeToken, it will only generate queueId
router.post("/testInvokeEVMHandleBridgeToken", (req, res) => {
  invokeEVMHandleBridgeToken({
    txId: Date.now() + "123",
    senderAddress: "tushar",
    receiverAddress: "1F53959B76C4d7851078b580dC869e8712310492",
    amount: "1000000000",
    retryCount: "0",
  });
  res.send("Called invoke EVM HandleBridgeToken!");
});

router.post("/testRollback", (req, res) => {
  invokeRollBackTransaction(req.body.nonce);
  res.send("Called invoke rollback tx!");
});


// To complete the step on mainnet , where GiniAddress would be set by KMS key
router.post("/setGiniAddress", (req, res) => {
  setGiniAddress(req.body.giniTokenAddress);
  res.send("Called invoke EVM setGiniAddress!");
});

// To create Miltiple record on KalpStore
router.post("/createMultipleTxRecord", async (req, res) => {
  const latestBlock = await getLatestBlockNumber();
  for (let i = 0; i < 10; i++) {
    setTimeout(() => {
      const txId = "txETH" + (i + 85);
      console.log("Making call createTxRecord " + Date.now() + " : " + txId);
      const data = {
        txId: txId, // always unique, this is txHash
        senderAddress: "0b87970433b22494faff1cc7a819e71bddc7880c", // 0x is not here
        receiverAddress: "1F53959B76C4d7851078b580dC869e8712310492",
        amount: "1000000",
        status: EVENT_READ_BY_KALP_MIDDLEWARE,
        sourceChainId: KALP_CHAIN,
        destinationChainId: POLYGON_CHAIN,
        queueId: "",
        kalpTxHash: "",
        blockNumber: Number(latestBlock), // It has no sense for KalpToEth Flow
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      createTxRecordKalpStore(data);
    }, 4000 * i);
  }
  res.send("called createMultipleTxRecord!");
});

router.post("/updateMultipleTxStatus", async (req, res) => {
  const results = await getLastUnprocessedTx(req.body.ofStatus, req.body.from, req.body.to);
  console.log(JSON.parse(results.data).unprocessedTxCount);
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      updateKalpStoreTxStatus(JSON.parse(results.data).records[i].txId, req.body.toStatus);
    }, 4000 * i);
  }
  res.send("called updateMultipleTxStatus!");
});

router.post("/updateTxStatus", async (req, res) => {
  updateKalpStoreTxStatus(req.body.txId, req.body.toStatus);
  res.send("called updateTxStatus!");
});

// To create Random Tx on kalpStore
router.post("/createRandomTx", async (req, res) => {
  const latestBlock = await getLatestBlockNumber();
  const txId = Date.now() + "123";
  const data = {
    txId: txId, // always unique, this is txHash
    senderAddress: "0b87970433b22494faff1cc7a819e71bddc7880c", // 0x is not here
    receiverAddress: "1F53959B76C4d7851078b580dC869e8712310492",
    amount: "1000000",
    status: EVENT_READ_BY_KALP_MIDDLEWARE,
    sourceChainId: KALP_CHAIN,
    destinationChainId: POLYGON_CHAIN,
    queueId: "",
    kalpTxHash: "",
    blockNumber: Number(latestBlock), // It has no sense for KalpToEth Flow
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  createTxRecordKalpStore(data);
  res.send({ message: "called CreateRandomTx!", txId: txId });
});

// Example to write on EVM via SDK
router.post("/writeToEVMViaSDK", writeViaSDK);

// Example to write on EVM via SDK
router.post("/writeToEVMViaSDKForTPS", writeViaSDKForTPS);

// Example to write on EVM via Thirdweb APIs and give process mined or error status
router.post("/writeToEVMViaCall", writeViaCall);

// // Example of Webhook - incomplete
// router.post("/webhook", webhook);

router.get("/test", (req, res) => {
  res.send("Tested!");
});

// ==============================
// Queue Routes , EVM to Kalp
// ===============================

router.get("/printQueue", (req, res) => {
  res.send(queue.printQueue());
});

module.exports = router;
