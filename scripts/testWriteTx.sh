#!/bin/bash


# Make the cURL request

curl --location 'http://localhost:3000/evmKalp/writeTx' \
--header 'x-transaction-id: 123' \
--header 'Content-Type: application/json' \
--header 'Cookie: connect.sid=s%3Av7X3yW5m5sKMQN41DYDDwg904nRQAsfo.3D5zUYv5XRWaMsURya8cp2rki5lVJQ4F3s0Gg8noi3E' \
--data '{
"txId": "txETH12",
"bridgeTx": "{\"txId\":\"txETH12\",\"senderAddress\":\"0b87970433b22494faff1cc7a819e71bddc7880c\",\"receiverAddress\":\"574440CdD2E36FA8013CBaC32a97bAf20B579360\",\"amount\":\"10000000000000000000\",\"status\":\"EventReadByKalpMiddleware\",\"sourceChainId\":1,\"destinationChainId\":3,\"queueId\":\"\",\"kalpTxHash\":\"\",\"blockNumber\":8242,\"retryCount\":0,\"createdAt\":1736513586411,\"updatedAt\":1736535785849}"
}'

# Check for errors
if [ $? -ne 0 ]; then
echo "cURL request failed."
exit 1
fi

echo "Request successful. Response saved to output.json"