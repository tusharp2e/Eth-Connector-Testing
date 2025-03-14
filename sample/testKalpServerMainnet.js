const { Network, submitTransaction, evaluateTransaction } = require("kalp-wallet-ts");
// const { evaluateTransaction } = require("./kalpWallet.js");

// here kalp-wallet-ts is passed which was shared by Chirag
// i have kept that inside folder as well
ReadTxToKalpChainMainnet = async () => {
  try {
    console.log("Before ReadTxToEVMChain");
    const invokerId = "df8d3fa8c59a69d8931fe2ad779bb406d8b33427";
    const privateKeyString =
      "-----BEGIN PRIVATE KEY-----\nMEECAQAwEwYHKoZIzj0CAQYIKoZIzj0DAQcEJzAlAgEBBCAxVW8ZZ46GXUJSAJJm\n6Iujei1S56cYRxRVH1kge1XqOw==\n-----END PRIVATE KEY-----\n";
    const cert =
      "-----BEGIN CERTIFICATE-----\nMIIDcjCCAxigAwIBAgIUV939lRrzMcUhremZ9QMIVeCjbG0wCgYIKoZIzj0EAwIw\ngbcxCzAJBgNVBAYTAlVTMREwDwYDVQQIEwhEZWxhd2FyZTFQME4GA1UEBxNHUDJF\nIExBQlMgTExDICAxMDA3IE4gT3JhbmdlIFN0LiA0dGggRmxvb3IgU3RlIDEzODIg\nV2lsbWluZ3RvbiBVLlMgMTk4MDExETAPBgNVBAoTCE1BSSBMYWJzMQ8wDQYDVQQL\nEwZjbGllbnQxHzAdBgNVBAMTFmthbHBjaGFpbnR3by1pbnQtYWRtaW4wHhcNMjMw\nNzE0MTUyNjAwWhcNMjYwMzA2MTM0NzAwWjCBwjELMAkGA1UEBhMCSU4xFjAUBgNV\nBAgTDVlvdXIgUHJvdmluY2UxFjAUBgNVBAcTDVlvdXIgTG9jYWxpdHkxGjAYBgNV\nBAoTEVlvdXIgT3JnYW5pemF0aW9uMTQwDQYDVQQLEwZjbGllbnQwDgYDVQQLEwdj\nbGllbnRzMBMGA1UECxMMa2FscGNoYWludHdvMTEwLwYDVQQDEyhkZjhkM2ZhOGM1\nOWE2OWQ4OTMxZmUyYWQ3NzliYjQwNmQ4YjMzNDI3MFkwEwYHKoZIzj0CAQYIKoZI\nzj0DAQcDQgAEJ7zXri9gghjUjmyR/HQNKTQ6PREYXdDAcuKHlTbXBGBHpuJXnqSL\nraHfRzqorQGciQ3/kIXMMSHwtiZiWNhLfqOB9DCB8TAOBgNVHQ8BAf8EBAMCB4Aw\nDAYDVR0TAQH/BAIwADAdBgNVHQ4EFgQUsFp+n/eOJBDhIEOJpOxmSPQZiscwHwYD\nVR0jBBgwFoAUevzhkjuu5jCjJuQbQQqhKuCXw4swgZAGCCoDBAUGBwgBBIGDeyJh\ndHRycyI6eyJoZi5BZmZpbGlhdGlvbiI6ImthbHBjaGFpbnR3by5jbGllbnRzIiwi\naGYuRW5yb2xsbWVudElEIjoiZGY4ZDNmYThjNTlhNjlkODkzMWZlMmFkNzc5YmI0\nMDZkOGIzMzQyNyIsImhmLlR5cGUiOiJjbGllbnQifX0wCgYIKoZIzj0EAwIDSAAw\nRQIhAKe+wDB0kcG+IlHQhxQXToy3F+9SSvalOiXFpLVBfWVWAiAnncUh5VrNFVCm\nrXUWz5xNvHS9NFTIBvSzt6pl5WKfvA==\n-----END CERTIFICATE-----\n";

    console.log("Inputs->", invokerId, "\t", privateKeyString, "\t", cert, "\t");
    console.log("Network->", Network.Mainnet);

    const makeTransaction = await evaluateTransaction(
      "Mainnet",
      "https://rpc-mumbai.kalp.network/transaction/v1", // Assuming rpcURL is equivalent to nglURL
      invokerId,
      privateKeyString,
      cert,
        "kalptwo",
      "klp-e7e044e8b0-cc",
      "GetUnprocessedTxForStatus",
      ["EventReadByKalpMiddleware","1","3"]
    );

    console.log("Endorse Success", makeTransaction);
    console.log("Successful!");
  } catch (error) {
    console.log(error);
    console.error(`Error at ReadTxToEVMChain: ${error.message}`);

    // response.generateErrorResponse(res, error.statusCode || 500, error);
    return;
  }
};

ReadTxToKalpChainMainnet();

ReadTxToKalpChainStagenet = async () => {
  try {
    console.log("Before ReadTxToEVMChain");
    const invokerId = "7aaf07011bf81043918b214b3b592ed067dd6f21";
    const privateKeyString =
      "-----BEGIN PRIVATE KEY-----\nMEECAQAwEwYHKoZIzj0CAQYIKoZIzj0DAQcEJzAlAgEBBCA6Nf1kiSi9QZ9dWXfI\ncSw6ISdmpqT37vPoyTC1JNAVYg==\n-----END PRIVATE KEY-----";
    const cert =
      "-----BEGIN CERTIFICATE-----\nMIIDdTCCAxugAwIBAgIUTRSaD47n+B8AtN+5rphueZWNJxAwCgYIKoZIzj0EAwIw\ngbgxCzAJBgNVBAYTAlVTMREwDwYDVQQIEwhEZWxhd2FyZTFQME4GA1UEBxNHUDJF\nIExBQlMgTExDICAxMDA3IE4gT3JhbmdlIFN0LiA0dGggRmxvb3IgU3RlIDEzODIg\nV2lsbWluZ3RvbiBVLlMgMTk4MDExETAPBgNVBAoTCE1BSSBMYWJzMQ8wDQYDVQQL\nEwZjbGllbnQxIDAeBgNVBAMTF2thbHBzdGFnZW5ldDEtaW50LWFkbWluMB4XDTI0\nMDQwMzA3NDIwMFoXDTI2MDEwNTE3NTYwMFowgcMxCzAJBgNVBAYTAklOMRYwFAYD\nVQQIEw1Zb3VyIFByb3ZpbmNlMRYwFAYDVQQHEw1Zb3VyIExvY2FsaXR5MRowGAYD\nVQQKExFZb3VyIE9yZ2FuaXphdGlvbjE1MA0GA1UECxMGY2xpZW50MA4GA1UECxMH\nY2xpZW50czAUBgNVBAsTDWthbHBzdGFnZW5ldDExMTAvBgNVBAMTKDdhYWYwNzAx\nMWJmODEwNDM5MThiMjE0YjNiNTkyZWQwNjdkZDZmMjEwWTATBgcqhkjOPQIBBggq\nhkjOPQMBBwNCAARIN4oJv77n3St7SD3KEuMvHDtegPfFuaNwdp95T1yevL0rBSRr\nGFRURg+1EKUxvsD0C8etFLh+EiZyDQzufTxMo4H1MIHyMA4GA1UdDwEB/wQEAwIH\ngDAMBgNVHRMBAf8EAjAAMB0GA1UdDgQWBBRBL3klrNCEvl6WiR6aZGzpZPq50jAf\nBgNVHSMEGDAWgBRcR4QSSVDgTfN5sy2w8Rp4bYOjVzCBkQYIKgMEBQYHCAEEgYR7\nImF0dHJzIjp7ImhmLkFmZmlsaWF0aW9uIjoia2FscHN0YWdlbmV0MS5jbGllbnRz\nIiwiaGYuRW5yb2xsbWVudElEIjoiN2FhZjA3MDExYmY4MTA0MzkxOGIyMTRiM2I1\nOTJlZDA2N2RkNmYyMSIsImhmLlR5cGUiOiJjbGllbnQifX0wCgYIKoZIzj0EAwID\nSAAwRQIhAOBS5YJUU+urXbwjub1ZHyzUGiB0w7btPSV2L29njVKJAiAYrYRYPeCc\nyRBoLns/BBRX7flpOEHl2qa7A+Bb/jr7og==\n-----END CERTIFICATE-----\n";

    console.log("Inputs->", invokerId, "\t", privateKeyString, "\t", cert, "\t");
    console.log("Network->", Network.Mainnet);
    const result = await evaluateTransaction(
      Network.Stagenet,
      invokerId,
      privateKeyString,
      cert,
      "kalp",
      "testing_kalpstore_newcc",
      "GetUnprocessedTxForStatus",
      ["EventReadByKalpMiddleware","1","3"]
    );

    console.log("Endorse Success", result);
    console.log("Successful!");
  } catch (error) {
    console.log(error);
    console.error(`Error at ReadTxToEVMChain: ${error.message}`);

    // response.generateErrorResponse(res, error.statusCode || 500, error);
    return;
  }
};

// ReadTxToKalpChainStagenet();
