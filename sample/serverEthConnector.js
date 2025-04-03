const { Agent, setGlobalDispatcher } = require("undici");
const agent = new Agent({
  connect: {
    rejectUnauthorized: false,
  },
});

setGlobalDispatcher(agent);
// Thirdweb Engine for stagenet and intmainnet 
// const AUTH_TOKEN = "Bearer eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIweDVBZTVGODhDRWM1Q0ZmRjE4NDIyRWY0YURkRUI2ODU4ODhhN0NFZjAiLCJzdWIiOiIweGNFMjM4OTMzODcxRTNEQzFjMTQ0MUY4RTRlNzg5ZDNlRDNCYjRjNzEiLCJhdWQiOiJ0aGlyZHdlYi5jb20iLCJleHAiOjQ4ODk5NDEwNDIsIm5iZiI6MTczNjM0MTA0MiwiaWF0IjoxNzM2MzQxMDQyLCJqdGkiOiIwNTk4ZDljNC1lZjNkLTQ1MzYtOWY1My04ZDAzODczNWI0MjUiLCJjdHgiOnsicGVybWlzc2lvbnMiOiJBRE1JTiJ9fQ.MHg5Y2EwZGFiMmVhZDU3YjE1M2RhMDE4ZTMxNjY5OGM5ZTI2MDNjYTFmZjM4MGFjMzllYTg2ZWIwNWFiODQxYTgyNGQwNzI0NTY3YzYzMDdmODg5YmVkNjRjMmMwYzQwZmY4NTc1MjE1Mjc2ZDBiYTc0NGVmYjk5MDM2NGYxYzM0NjFj";
// const BACKEND_WALLET_ADDRESS = "0x69EcF0bb81Df630F3eB52281A0F8c2B75e20eD42";
// const ENGINE_URL = "https://139.59.14.43:3005"
// const WRITE_CONTRACT_URL = `${ENGINE_URL}/contract/80002/0xA17bd954dCf3B56C47f75146D27Ff30A0afF78F2/write`

// Thirdweb Engine Credential by Rajat
// const AUTH_TOKEN = "Bearer eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIweGNkZjRGNDlENkRDMDdCQTRFYzY0M0FENjJkQjQyNWRiMGU2ODFBZjUiLCJzdWIiOiIweDg4N2RDOThjMmE4N0ZBRjAwNGNhNzlCOENCNkIyZjAzMjhiYjgzMTQiLCJhdWQiOiJ0aGlyZHdlYi5jb20iLCJleHAiOjQ4OTQ3Nzc5MTYsIm5iZiI6MTc0MTE3NzkxNiwiaWF0IjoxNzQxMTc3OTE2LCJqdGkiOiI3ZTE1NjM0Yy04ZWI0LTQwYzEtYjEyOS1iZWUzZjhmZjM4NTAiLCJjdHgiOnsicGVybWlzc2lvbnMiOiJBRE1JTiJ9fQ.MHg5MTc2NTNiMzYxZDQ2MTJiNjg2MGM2YzZmZWI0NzY1ZjAyMWQ0MDVlZmUzNGQ3NGI3YTEyNGU0NGFiYzRmYjRkMzZkZDM5ZmJjZTRhZWRmMTUyYjliNWEyZjA5ZjU2MmM1MDNmZTk4Mzk1NjljMDNhNzVhZDUzOGVkOWE0NTdiNTFi";
// const BACKEND_WALLET_ADDRESS = "0x4588DBF8938d7f1fc40935BE2661B859d506a27a";
// const ENGINE_URL = "https://kalp-thirdweb-engine.kalp.network";
// const WRITE_CONTRACT_URL = `${ENGINE_URL}/contract/80002/0xA17bd954dCf3B56C47f75146D27Ff30A0afF78F2/write`

// Engine of Mohit's setup 
const AUTH_TOKEN = "Bearer eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIweDQ2QUFkOTQ1NWUzMUJEZTk2NDg1RjM3OTYxNDQzNjNFQzZEOEYwMzgiLCJzdWIiOiIweDM3RDA0MTI4MWVCZjY1MDMzMDMzNjUyNjI5N2IzNDNiQzQ1NUY2OEMiLCJhdWQiOiJ0aGlyZHdlYi5jb20iLCJleHAiOjQ4OTUzODE2NTEsIm5iZiI6MTc0MTc4MTY1MSwiaWF0IjoxNzQxNzgxNjUxLCJqdGkiOiJmYWMyYzgzYi04NjhlLTQ0ZTMtODJjZC0wZDhiMTJkYTEyMDMiLCJjdHgiOnsicGVybWlzc2lvbnMiOiJBRE1JTiJ9fQ.MHg4MThhYjY1ZGRiNTBhNDgxMTQyODUxYWNhOTBlMWVkZDlmNzc1NDUyMDg4OWNlNmEyMmYxYzk3NmRiZGE0MDZiMjUzYzU3OWI4ZGFkNjM4YjUxMDQ4YTJjMzMyOWNmNTdmYzBiNDg0ZWFkNDg2NGU4ZjY0ZDQ4N2ViNzk5YjA3ZTFj";
const BACKEND_WALLET_ADDRESS = "0x37D041281eBf650330336526297b343bC455F68C";
const ENGINE_URL = "https://64.227.188.32:3005";
const WRITE_CONTRACT_URL = `${ENGINE_URL}/contract/80002/0x9f422e66930329A4dDfD43b9c67f77cb53Ce5e88/write`

const invokeEVMHandleBridgeToken = async (bridgeTxJSON) => {
  try {
    console.log(`Invoking HandleBridgeToken on EVM for txId ${bridgeTxJSON.txId}!`);
    bridgeTxJSON.receiverAddress = "0x" + bridgeTxJSON.receiverAddress;
    const idempotencyKey = String(bridgeTxJSON.txId) + bridgeTxJSON.retryCount;

    const resp = await fetch(WRITE_CONTRACT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: AUTH_TOKEN,
        "x-backend-wallet-address": BACKEND_WALLET_ADDRESS,
        "x-idempotency-key": idempotencyKey,
      },
      body: JSON.stringify({
        functionName: "handleBridgeToken",
        args: [bridgeTxJSON.senderAddress, bridgeTxJSON.receiverAddress, bridgeTxJSON.amount, bridgeTxJSON.txId],
      }),
    });
    const { result } = await resp.json();
    console.log(`QueueId generated for ${bridgeTxJSON.txId} is "${result.queueId}"!`);
    return {
      status: "success",
      message: "EVM Invoked successfully",
      data: result.queueId,
    };
  } catch (err) {
    console.log(err)
    console.log(`Error during invoking HandleBridgeToken! ${err}`);
    return {
      status: "failed",
      message: err.message,
    };
  }
};

const writeViaCall = async () => {
  try {
    console.log("Calling Thirdweb APIs to write to evm!");
    const invokeResponse = await invokeEVMHandleBridgeToken({
      txId: Date.now() + "123",
      senderAddress: "1F53959B76C4d7851078b580dC869e8712310492",
      receiverAddress: "1F53959B76C4d7851078b580dC869e8712310492",
      amount: "1000000000",
      retryCount: "0",
    });
    return { message: " Successful!!", queueId: invokeResponse.data };
  } catch (err) {
    console.log(`Calling Thirdweb APIs failed! ${err}`);
    return { error: err };
  }
};

// writeViaCall();

const invokeRollbackTransaction = async (nonce) => {
  try {
    console.log(`Invoking RollbackTransaction on EVM for nonce ${nonce}!`);
    
    const resp = await fetch(WRITE_CONTRACT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: AUTH_TOKEN,
        "x-backend-wallet-address": BACKEND_WALLET_ADDRESS,
      },
      body: JSON.stringify({
        functionName: "rollbackTransaction",
        args: [nonce], 
      }),
    });
    console.log(resp)
    const { result } = await resp.json();
    console.log(`QueueId generated for rollback nonce ${nonce} is "${result.queueId}"!`);
    return {
      status: "success",
      message: "EVM Invoked successfully",
      data: result.queueId,
    };
  } catch (err) {
    console.log(`Error during invoking RollBackTransaction! ${err}`);
    return {
      status: "failed",
      message: err.message,
    };
  }
};

const writeViaCall2 = async () => {
  try {
    console.log("Calling Thirdweb APIs to write to evm!");
    const invokeResponse = await invokeRollbackTransaction(22);
    return { message: " Successful!!", queueId: invokeResponse.data };
  } catch (err) {
    console.log(`Calling Thirdweb APIs failed! ${err}`);
    return { error: err };
  }
};

writeViaCall2();
