#!/bin/bash

while true; do
  curl --location --request POST 'http://localhost:3001/thirdweb/writeToEVMViaSDK' \
       --header 'Cookie:connect.sid=s%3A_xPRXVoRx26VxNqWYXqt9mhuSuhP0rgw.qb753qFKux4LVyfVlSn6u4COp95Go4wU6QTvuDS2cZw'
  sleep 20
done
