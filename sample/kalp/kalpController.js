// Delete this file, not needed

"use strict";
const { Network, submitTransaction, evaluateTransaction } = require("kalp-wallet-ts");

exports.WriteTxToEVMChain = async (req, res) => {
  console.log("Before WriteTxToEVMChain");

  try {
    // Capture received data into local variables
    const {
      invokerId: invokerId,
      privateKeyString: privateKeyString,
      cert: cert,
      txId: txId,
      senderAddress: senderAddress,
      receiverAddress: receiverAddress,
      privateKeyEth: privateKeyEth,
      amount: amount,
      sourceChainId: sourceChainId,
      destinationChainId: destinationChainId,
    } = req.body;

    console.log("Inputs->", invokerId, "\t", privateKeyString, "\t", cert, "\t");
    console.log("channel----------->", process.env.KALP_ENV_CHANNEL);
    console.log("localconstants.chaincode----------->", process.env.KALP_CONTRACT);

    console.log("Network->", Network.Stagenet);
    //Pradeep Need function and input to update hash

    //   Update hash to kalpchain
    const result = await evaluateTransaction(
      Network.Stagenet,
      invokerId,
      privateKeyString,
      cert,
      "kalp",
      "testing_kalpstore_newcc",
      "UpdateTxRecord",
      ["MOCKETH5", '{"queueId":"0xdf36f0d6a29ef586f465c2b2714c99f0dd7bb416ae66d8011227020275e88350"}']
    );

    // ["MOCKETH34","{\"retryCount\":5}"]
    console.log("Endorse Success", result);

    //

    const makeTransaction = await submitTransaction(
      Network.Stagenet,
      invokerId,
      privateKeyString,
      cert,
      "kalp",
      "testing_kalpstore_newcc",
      "UpdateTxRecord",
      ["MOCKETH5", '{"queueId":"0xdf36f0d6a29ef586f465c2b2714c99f0dd7bb416ae66d8011227020275e88350"}']
    );
    const output = JSON.stringify(makeTransaction);
    console.log(`transaction data2: ${makeTransaction}`);
    console.log("Submit Success", output);

    // const resp = await twHelper.Write(receiverAddress, amount, privateKeyEth);

    //T to provide function name to submit on EVM chain
    // if (resp.success) {
    //   res.status(500).send("Write to evm is successful!");
    // } else {
    //   res.status(400).send("Write to evm is unsuccessful!");
    // }
    res.status(200).send("Successful!");
  } catch (error) {
    console.log(error);
    console.error(`Error at WriteTxToEVMChain: ${error.message}`);

    // response.generateErrorResponse(res, error.statusCode || 500, error);
    return;
  }
};

exports.WriteTxToEVMChainStatus = async (req, res) => {
  console.log("Reached inside status update!");

  try {
    // Capture received data into local variables
    const currStatus = "EventReadByEthConnector";
    const {
      invokerId: invokerId,
      privateKeyString: privateKeyString,
      cert: cert,
      txId: txId,
      senderAddress: senderAddress,
      receiverAddress: receiverAddress,
      privateKeyEth: privateKeyEth,
      amount: amount,
      sourceChainId: sourceChainId,
      destinationChainId: destinationChainId,
    } = req.body;

    console.log("Inputs->", invokerId, "\t", privateKeyString, "\t", cert, "\t");
    console.log("channel----------->", process.env.KALP_ENV_CHANNEL);
    console.log("localconstants.chaincode----------->", process.env.KALP_CONTRACT);

    console.log("Network->", Network.Stagenet);
    //Pradeep Need function and input to update hash

    //   Update hash to kalpchain
    const result = await evaluateTransaction(
      Network.Stagenet,
      invokerId,
      privateKeyString,
      cert,
      "kalp",
      "testing_kalpstore",
      "UpdateTxRecord",
      [txId, `{"status":"` + currStatus + `"}`]
    );

    // ["MOCKETH34","{\"retryCount\":5}"]
    console.log("Endorse Success", result);

    //

    const makeTransaction = await submitTransaction(
      Network.Stagenet,
      invokerId,
      privateKeyString,
      cert,
      "kalp",
      "testing_kalpstore",
      "UpdateTxRecord",
      [txId, `{"status":"` + currStatus + `"}`]
    );
    const output = JSON.stringify(makeTransaction);
    console.log(`transaction data2: ${makeTransaction}`);
    console.log("Submit Success", output);

    // const resp = await twHelper.Write(receiverAddress, amount, privateKeyEth);

    //T to provide function name to submit on EVM chain
    // if (resp.success) {
    //   res.status(500).send("Write to evm is successful!");
    // } else {
    //   res.status(400).send("Write to evm is unsuccessful!");
    // }
    res.status(200).send("Successful!");
  } catch (error) {
    console.log(error);
    console.error(`Error at WriteTxToEVMChain: ${error.message}`);

    // response.generateErrorResponse(res, error.statusCode || 500, error);
    return;
  }
};

exports.ReadTxFromKalpStore = async (req, res) => {
  console.log("Reached inside status update!");

  try {
    // Capture received data into local variables
    const currStatus = "EventReadByEthConnector";
    const {
      invokerId: invokerId,
      privateKeyString: privateKeyString,
      cert: cert,
      txId: txId,
      senderAddress: senderAddress,
      receiverAddress: receiverAddress,
      privateKeyEth: privateKeyEth,
      amount: amount,
      sourceChainId: sourceChainId,
      destinationChainId: destinationChainId,
    } = req.body;

    console.log("Inputs->", invokerId, "\t", privateKeyString, "\t", cert, "\t");
    console.log("channel----------->", process.env.KALP_ENV_CHANNEL);
    console.log("localconstants.chaincode----------->", process.env.KALP_CONTRACT);

    console.log("Network->", Network.Stagenet);
    //Pradeep Need function and input to update hash

    //   Update hash to kalpchain
    const result = await evaluateTransaction(
      Network.Stagenet,
      invokerId,
      privateKeyString,
      cert,
      "kalp",
      "testing_kalpstore",
      "GetTxRecord",
      [txId]
    );

    // ["MOCKETH34","{\"retryCount\":5}"]
    console.log("Endorse Success", result);

    //

    // const makeTransaction = await submitTransaction(
    //   Network.Stagenet,
    //   invokerId,
    //   privateKeyString,
    //   cert,
    //   "kalp",
    //   "testing_kalpstore",
    //   "UpdateTxRecord",
    //   [
    //     txId,
    //     `{"status":"` + currStatus + `"}`
    //   ]
    // );
    // const output = JSON.stringify(makeTransaction);
    // console.log(`transaction data2: ${makeTransaction}`);
    // console.log("Submit Success", output);

    // const resp = await twHelper.Write(receiverAddress, amount, privateKeyEth);

    //T to provide function name to submit on EVM chain
    // if (resp.success) {
    //   res.status(500).send("Write to evm is successful!");
    // } else {
    //   res.status(400).send("Write to evm is unsuccessful!");
    // }
    res.status(200).send("Successful!");
  } catch (error) {
    console.log(error);
    console.error(`Error at WriteTxToEVMChain: ${error.message}`);

    // response.generateErrorResponse(res, error.statusCode || 500, error);
    return;
  }
};
