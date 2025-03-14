const { defineChain } = require("thirdweb/chains");
const {
  prepareContractCall,
  createThirdwebClient,
  getContract,
  prepareEvent,
  readContract,
  sendAndConfirmTransaction,
} = require("thirdweb");
const { invokeEVMHandleBridgeToken, fetchTxStatusByQueueId } = require("../../../services/thirdwebService.js");
const { privateKeyToAccount } = require("thirdweb/wallets");
// const { isValidSignature, isExpired } = require("../../utils/helper");

require('dotenv').config({path:__dirname+'/../../.env'})
console.log(process.env.BRIDGE_CONTRACT_ADDRESS)

// create the client with your clientId, or secretKey if in a server environment
const client = createThirdwebClient({
  clientId: "92e9eae3b0acac5a56e995c5f217e920",
});

// connect to your contract
const contract = getContract({
  client,
  chain: defineChain(80002),
  address: process.env.BRIDGE_CONTRACT_ADDRESS,
});

const preparedEvent = prepareEvent({
  signature: "event TokenBridged(uint256 txnID, address receiver, uint256 amount)",
});

// It wont work as there is no txnID function inside
// current bridgeContractAddress 0xA17bd954dCf3B56C47f75146D27Ff30A0afF78F2
const read = async (req, res) => {
  const data = await readContract({
    contract,
    method: "function txnID() view returns (uint256)",
    params: [],
  });

  console.log("data", data);
  res.send("Read is successful!");
};

const writeViaSDK = async (req, res) => {
  console.log("Calling Thirdweb SDK to write to evm!");
  const _receiver = "0x1F53959B76C4d7851078b580dC869e8712310492";
  const _amount = 1000000000000;

  const transaction = await prepareContractCall({
    contract,
    method: "function bridgeToken(string memory _receiverAddress, uint256 _amount)",
    params: [_receiver, _amount],
  });
  console.log(transaction);

  // client is important to add here.
  const account = privateKeyToAccount({
    client,
    privateKey: "4a44f6b11af1e97b513fdae8d0d2a857703379126f46914e51f693261de8fbc2",
    encryption: false, // no encryption
  });

  const { transactionHash } = await sendAndConfirmTransaction({
    transaction,
    account,
  });

  console.log(transactionHash);
  res.send({ message: "Write send is successful!", txId: transactionHash });
};

const writeViaCall = async (req, res) => {
  try {
    console.log("Calling Thirdweb APIs to write to evm!");
    const invokeResponse = await invokeEVMHandleBridgeToken({
      txId: Date.now() + "123",
      senderAddress: "tushar",
      receiverAddress: "1F53959B76C4d7851078b580dC869e8712310492",
      amount: "1000000000",
      retryCount: "0",
    });
    retryToFetchStatus(invokeResponse.data);
    return res.status(200).json({ message: " Successful!!", queueId: invokeResponse.data });
  } catch (err) {
    console.log(`Calling Thirdweb APIs failed! ${err}`);
    return res.status(400).json({ error: err });
  }
};

const retryToFetchStatus = async (queueId, attempt = 1) => {
  const response = await fetchTxStatusByQueueId(queueId);
  console.log(response);
  if (response.status == "mined") {
    console.log("Received status as mined");
    console.log("Hash is ", response.transactionHash);
    return;
  }
  if (response.status == "errored") {
    console.log("Received status as errored");
    return;
  }
  if (attempt < 13) {
    const delay = 7000; // Every 7 seconds
    console.log(`Desired result not found. Retrying in ${delay}ms (attempt ${attempt}/13)...`);
    return await new Promise((resolve) => setTimeout(resolve, delay)).then(() => retryToFetchStatus(queueId, attempt + 1));
  }
  return;
};

// const webhook = async (req, res) => {
//   try {
//     const signatureFromHeader = req.header("X-Engine-Signature");
//     const timestampFromHeader = req.header("X-Engine-Timestamp");

//     if (!signatureFromHeader || !timestampFromHeader) {
//       return res.status(401).send("Missing signature or timestamp header");
//     }

//     console.log("Webhook Reached!");
//     console.log(process.env.WEBHOOK_SECRET);
//     console.log(req.body);
//     if (!isValidSignature(req.body, timestampFromHeader, signatureFromHeader, process.env.WEBHOOK_SECRET)) {
//       console.log("Webhook validation failed!");
//       return res.status(401).send("Invalid signature");
//     }

//     console.log("Webhook Reached2!");

//     if (isExpired(timestampFromHeader, 300)) {
//       // Assuming expiration time is 5 minutes (300 seconds)
//       return res.status(401).send("Request has expired");
//     }

//     // Process the request
//     res.status(200).send("Webhook received!");
//   } catch (err) {
//     console.log(err);
//   }
// };

module.exports = { read, writeViaSDK, writeViaCall };
