#!/bin/bash

while true; do
  # Send the cURL request and capture the response in a variable
  response=$(curl --silent --location 'http://localhost:3000/evmKalp/readFromQueue' \
                  --header 'Cookie: connect.sid=s%3AjTdhVUN1K3PAeOlbKrQ3VKqx6PNR5j3m.MWE%2FszbjwiVw8yVG5OZV6EoQglDt4Ms3qxqM1UPIfhU')

  # Check if the request was successful (exit code 0)
  if [[ $? -eq 0 ]]; then
    # Parse the JSON response using jq (assuming it's installed)
    txId=$(echo "$response" | jq -r '.data.txId')

    # Check if txId exists in the response
    if [[ -n "$txId" && "$txId" != "null" ]]; then
      echo "Extracted txId: $txId"

      # Send update request with proper JSON payload and no trailing backslashes
      curl --silent --location --request POST 'http://localhost:3001/thirdweb/updateTxStatus' \
           --header 'Content-Type: application/json' \
           --header 'Cookie: connect.sid=s%3AjTdhVUN1K3PAeOlbKrQ3VKqx6PNR5j3m.MWE%2FszbjwiVw8yVG5OZV6EoQglDt4Ms3qxqM1UPIfhU' \
           --data "{\"txId\": \"$txId\", \"toStatus\": \"EventReadByKalpMiddleware\"}"

      sleep 5

      # Delete from queue request without unnecessary backslashes
      curl --silent --location --request POST 'http://localhost:3000/evmKalp/deleteFromQueue' \
           --header 'Cookie: connect.sid=s%3AjTdhVUN1K3PAeOlbKrQ3VKqx6PNR5j3m.MWE%2FszbjwiVw8yVG5OZV6EoQglDt4Ms3qxqM1UPIfhU' \
           --data ''

    else
      echo "txId not found in the response."
    fi
  else
    echo "Error sending cURL request."
  fi

  sleep 60
done
