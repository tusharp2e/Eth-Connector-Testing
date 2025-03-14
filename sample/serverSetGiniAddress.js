const { Agent, setGlobalDispatcher } = require("undici");
const agent = new Agent({
  connect: {
    rejectUnauthorized: false,
  },
});

setGlobalDispatcher(agent);

// Thirdweb Engine Credential by Rajat
const AUTH_TOKEN = "Bearer eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIweGNkZjRGNDlENkRDMDdCQTRFYzY0M0FENjJkQjQyNWRiMGU2ODFBZjUiLCJzdWIiOiIweDg4N2RDOThjMmE4N0ZBRjAwNGNhNzlCOENCNkIyZjAzMjhiYjgzMTQiLCJhdWQiOiJ0aGlyZHdlYi5jb20iLCJleHAiOjQ4OTQ3Nzc5MTYsIm5iZiI6MTc0MTE3NzkxNiwiaWF0IjoxNzQxMTc3OTE2LCJqdGkiOiI3ZTE1NjM0Yy04ZWI0LTQwYzEtYjEyOS1iZWUzZjhmZjM4NTAiLCJjdHgiOnsicGVybWlzc2lvbnMiOiJBRE1JTiJ9fQ.MHg5MTc2NTNiMzYxZDQ2MTJiNjg2MGM2YzZmZWI0NzY1ZjAyMWQ0MDVlZmUzNGQ3NGI3YTEyNGU0NGFiYzRmYjRkMzZkZDM5ZmJjZTRhZWRmMTUyYjliNWEyZjA5ZjU2MmM1MDNmZTk4Mzk1NjljMDNhNzVhZDUzOGVkOWE0NTdiNTFi";
const BACKEND_WALLET_ADDRESS = "0x4588DBF8938d7f1fc40935BE2661B859d506a27a";
const ENGINE_URL = "https://kalp-thirdweb-engine.kalp.network";
// update this url 
const WRITE_CONTRACT_URL = `${ENGINE_URL}/contract/80002/0x388EAC1C0322707b6bfa10D2361bD11F63F7f352/write`


  const setGiniAddress = async (_giniTokenAddress) => {
    try {
      console.log(`Invoking setGiniTokenAddress on EVM for ${_giniTokenAddress}!`);
      const resp = await fetch(WRITE_CONTRACT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: AUTH_TOKEN,
          "x-backend-wallet-address": BACKEND_WALLET_ADDRESS,
        },
        body: JSON.stringify({
          functionName: "setGiniToken",
          args: [_giniTokenAddress],
        }),
      });
      const { result } = await resp.json();
      console.log(`QueueId generated for ${_giniTokenAddress} is "${result.queueId}"!`);
      return {
        status: "success",
        message: "EVM Invoked successfully",
        data: result.queueId,
      };
    } catch (err) {
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
    const invokeResponse = await setGiniAddress("0xC4C2ed9336A16886d3238d00b18efc7A7f9DEEF6");  //update this
    return { message: " Successful!!", queueId: invokeResponse.data };
  } catch (err) {
    console.log(`Calling Thirdweb APIs failed! ${err}`);
    return { error: err };
  }
};

// before making this call
// 1. update the param of setGiniAddress
// 2. update the WRITE_CONTRACT_URL url 
writeViaCall();