const { Network, submitTransaction, evaluateTransaction } = require("kalp-wallet-ts");
// const { evaluateTransaction } = require("./kalpWallet.js");

WriteTxToKalpChain = async () => {
  try {
    console.log("Before WriteTxToEVMChain");
    const channelName = "kalp";
    const chainCodeName = "klp-abcb102-cc"
 
    const transactionName = "BridgeToken";
    const transactionParams = [`1F53959B76C4d7851078b580dC869e8712310492`, "10000000000000000000"];
 
    const privateKeyString = "-----BEGIN PRIVATE KEY-----\r\nMEECAQAwEwYHKoZIzj0CAQYIKoZIzj0DAQcEJzAlAgEBBCCfT4cOgAMixovrMi\/V\r\n2ZunH6Iqhw9IvCqZh+aBgWDFkQ==\r\n-----END PRIVATE KEY-----"
    const publicKeyString = "-----BEGIN PUBLIC KEY-----\\r\\nMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEAZi+5+qulPAr0XJ8SpB9DNYhYgaqK1t0GwH7GauB+r1CiGlXl3Fmbs+fB0YqbpbQMBt7u1w647A14EDXv+C48A==\\r\\n-----END PUBLIC KEY-----";
    const cert =  "-----BEGIN CERTIFICATE-----\nMIIDdTCCAxugAwIBAgIUVbc/NXhJDtDBk//bDucP9pYKAE8wCgYIKoZIzj0EAwIw\ngbgxCzAJBgNVBAYTAlVTMREwDwYDVQQIEwhEZWxhd2FyZTFQME4GA1UEBxNHUDJF\nIExBQlMgTExDICAxMDA3IE4gT3JhbmdlIFN0LiA0dGggRmxvb3IgU3RlIDEzODIg\nV2lsbWluZ3RvbiBVLlMgMTk4MDExETAPBgNVBAoTCE1BSSBMYWJzMQ8wDQYDVQQL\nEwZjbGllbnQxIDAeBgNVBAMTF2thbHBzdGFnZW5ldDEtaW50LWFkbWluMB4XDTI0\nMDQwMzA3NDIwMFoXDTI1MTAyMjE1MjMwMFowgcMxCzAJBgNVBAYTAklOMRYwFAYD\nVQQIEw1Zb3VyIFByb3ZpbmNlMRYwFAYDVQQHEw1Zb3VyIExvY2FsaXR5MRowGAYD\nVQQKExFZb3VyIE9yZ2FuaXphdGlvbjE1MA0GA1UECxMGY2xpZW50MA4GA1UECxMH\nY2xpZW50czAUBgNVBAsTDWthbHBzdGFnZW5ldDExMTAvBgNVBAMTKDBiODc5NzA0\nMzNiMjI0OTRmYWZmMWNjN2E4MTllNzFiZGRjNzg4MGMwWTATBgcqhkjOPQIBBggq\nhkjOPQMBBwNCAAQBmL7n6q6U8CvRcnxKkH0M1iFiBqorW3QbAfsZq4H6vUKIaVeX\ncWZuz58HRipultAwG3u7XDrjsDXgQNe/4Ljwo4H1MIHyMA4GA1UdDwEB/wQEAwIH\ngDAMBgNVHRMBAf8EAjAAMB0GA1UdDgQWBBQDx8fcPvIryA01y4HwbN6wMveZ+jAf\nBgNVHSMEGDAWgBRcR4QSSVDgTfN5sy2w8Rp4bYOjVzCBkQYIKgMEBQYHCAEEgYR7\nImF0dHJzIjp7ImhmLkFmZmlsaWF0aW9uIjoia2FscHN0YWdlbmV0MS5jbGllbnRz\nIiwiaGYuRW5yb2xsbWVudElEIjoiMGI4Nzk3MDQzM2IyMjQ5NGZhZmYxY2M3YTgx\nOWU3MWJkZGM3ODgwYyIsImhmLlR5cGUiOiJjbGllbnQifX0wCgYIKoZIzj0EAwID\nSAAwRQIhAJhNjbzg+C4ZKZurtOXwCMdx7avwgB+MU5UK6x6aGie7AiADkAw5jXNg\n+DuJ3vGoci9SW8gS9hvpEFvCXVG1bzGKDg==\n-----END CERTIFICATE-----";
    const enrollmentId = "0b87970433b22494faff1cc7a819e71bddc7880c";
 
    console.log("enrollmentID", enrollmentId);
    console.log("transactionParams", transactionParams);
    console.log("privateKeyString", privateKeyString);
    console.log("publicKeyString", publicKeyString);
    console.log("Cert", cert);

    const makeTransaction = await submitTransaction(
      Network.Stagenet,
      enrollmentId,
      privateKeyString,
      cert,
      channelName,
      chainCodeName,
      transactionName,
      transactionParams
    );
    const result2 = JSON.stringify(makeTransaction);
    console.log(`transaction data2: ${makeTransaction}`);
    console.log("Successful!");
  } catch (error) {
    console.log(error);
    console.error(`Error at WriteTxToEVMChain: ${error.message}`);

    // response.generateErrorResponse(res, error.statusCode || 500, error);
    return;
  }
};

WriteTxToKalpChain();
