 const P256_SIGN_CURVE = "p256";
  const SECP256R1_SIGN_CURVE = "secp256r1";
  const EXPORT_PUBLIC_KEY_FORMAT = "spki";
  const KEY_PAIR_FORMAT_TYPE = "hex";
  const EXPORT_PRIVATE_KEY_FORMAT = "pkcs8";
  const PRIVATE_KEY_TYPE = "PKCS8PRV";
  
  //For getting secret
  const BASE_CHARACTER_SET =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=[]{}|;:,.<>?0123456789";
  const SPECIAL_CHARACTERS = "!@#$%^&*+-=";
  const UPPER_CASE_CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const LOWER_CASE_CHARACTERS = "abcdefghijklmnopqrstuvwxyz";
  const NUMBERS = "0123456789";
  
  //For registration and certificates
  const AUTHORIZATION_KEY =
    "f5b1aca0717e01d0dbca408d281e9e5145250acb146ff9f0844d53e95aab30b5";
  const CONTENT_TYPE = "application/json";
  const MAX_ENROLLMENTS = "-1";
  // const URL_CHANNEL_NAME = "prod-test-mainnet"; 
  // const NETWORK_GOVERNANCE_BASE_URL = "https://ngl-userreg-test.kalp.network/v1"

  const URL_CHANNEL_NAME = "kalpstagenet"; 
  const NETWORK_GOVERNANCE_BASE_URL = "https://stg-userreg-gov.p2eppl.com/v1"
  const REGISTER_URL = "/pki/register";
  const ENROLL_CSR_URL = "/pki/enrollCsr";
  const BASE_64_TABLE =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  
  // Read and write function
  const SIGN = "sign";
  const KEY_FORMAT = "raw";
  const SIGN_ALGORITHM = "ECDSA";
  const NAMED_CURVE = "P-256";
  const VERIFY_OPERATION = "verify";
  const HASH_ALGORITHM = "SHA-256";
  const SIGNATURE_ALGORITHM = "SHA256withECDSA";
  const BEGIN_PRIVATE_KEY = "-----BEGIN PRIVATE KEY-----";
  const END_PRIVATE_KEY = "-----END PRIVATE KEY-----";
  // const KALP_GATEWAY_BASE_URL = "https://rpc-mumbai-test.kalp.network/transaction/v1";
  const KALP_GATEWAY_BASE_URL = "https://stg-kalp-gateway.p2eppl.com/transaction/v1"
  
      /**
       * Environment variable for the network you need to connect .
       */
      const Network = {
        Stagenet: "STAGENET",
        Testnet: "TESTNET",
        Mainnet: "MAINNET",
      };
 
      
      /**
       * GetNetworkGovernanceUrl - Outputs the base url of network governance layer
      @param {string} environment - provide environment detail in string format.
      */
      function GetNetworkGovernanceUrl(environment) {
        switch (environment) {
          case Network.Stagenet:
            return NETWORK_GOVERNANCE_BASE_URL;
          default:
            throw Error(
              "An error occurred while getting network governance url :" +
                "invalid environment variable passed"
            );
        }
      }
      
      /**
       * GetNetworkGovernanceUrl - Outputs the base url of kalp gateway
      @param {string} environment - provide environment detail in string format.
      */
      function GetKalpGatewayUrl(environment) {
        switch (environment) {
          case Network.Stagenet:
            return KALP_GATEWAY_BASE_URL;
          default:
            throw Error(
              "An error occurred while getting kalp gateway url :" +
                "invalid environment variable passed"
            );
        }
      }
      
      /**
       * registerAndEnrollUser
      @param {string} network - provide network to which you want to register to.
      @param {string} enrollmentID - provide enrollment id in string.
      @param {string} csr - Provide certificate.
      */
      async function registerAndEnrollUser(network, enrollmentID, csr) {
        try {
          if (enrollmentID.length !== 40) {
            throw Error("Invalid enrollment ID: Must be 40 characters long.");
          }
      
          const encryptedWord = await getSecret(enrollmentID);
          const networkGovernanceBaseUrl = GetNetworkGovernanceUrl(network);
          const endpoint = networkGovernanceBaseUrl + REGISTER_URL;
          const headers = {
            Authorization: AUTHORIZATION_KEY,
          };
          const body = {
            enrollmentid: enrollmentID,
            secret: encryptedWord,
            maxenrollments: MAX_ENROLLMENTS,
            channel: URL_CHANNEL_NAME,
          };
          const response = await fetch(endpoint, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body),
          });
          if (!response.ok) {
            const jsonData = await response.json();
            const finalResponse = JSON.stringify(jsonData);
            throw Error(
              "An error occurred while doing user registration" + finalResponse
            );
          } else {
            const endpoint = networkGovernanceBaseUrl + ENROLL_CSR_URL;
            const headers = {
              Authorization: AUTHORIZATION_KEY,
            };
            const body = {
              enrollmentid: enrollmentID,
              secret: encryptedWord,
              csr: csr,
              channel: URL_CHANNEL_NAME,
            };
            const response = await fetch(endpoint, {
              method: "POST",
              headers: headers,
              body: JSON.stringify(body),
            });
            if (!response.ok) {
              const jsonData = await response.json();
              const finalResponse = JSON.stringify(jsonData);
              throw Error(
                "An error occurred while getting certificate" + finalResponse
              );
            } else {
              const responseData = await response.json();
              const cert = responseData.response.pubcert;
              return cert;
            }
          }
        } catch (error) {
          throw Error("An error occurred in user registration process " + error);
        }
      }
      
      /**
       * register
      @param {string} network - provide network to which you want to register to.
      @param {string} enrollmentID - provide enrollment id in string format.
      @param {string} csr - Provide certificate.
      */
      async function register(network, enrollmentID, encryptedWord) {
        try {
          if (enrollmentID.length !== 40) {
            throw Error("Invalid enrollment ID: Must be 40 characters long.");
          }
          const networkGovernanceBaseUrl = GetNetworkGovernanceUrl(network);
          const endpoint = networkGovernanceBaseUrl + REGISTER_URL;
          const headers = {
            Authorization: AUTHORIZATION_KEY,
          };
          const body = {
            enrollmentid: enrollmentID,
            secret: encryptedWord,
            maxenrollments: MAX_ENROLLMENTS,
            channel: URL_CHANNEL_NAME,
          };
          const response = await fetch(endpoint, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body),
          });
          if (!response.ok) {
            const jsonData = await response.json();
            const finalResponse = JSON.stringify(jsonData);
            throw Error(
              "An error occurred while doing user registration" + finalResponse
            );
          }
          const jsonData = await response.json();
          const responseData = JSON.stringify(jsonData);
          return responseData;
        } catch (error) {
          throw Error("An error occurred while doing user registration" + error);
        }
      }
      
      /**
       * enrollCsr
      @param {string} network - provide network to which you want to register to.
      @param {string} enrollmentID - provide enrollment id in string format.
      @param {string} encryptedWord - provide secret in string format.
      @param {string} csr - Provide certificate.
      */
      async function enrollCsr(network, enrollmentID, encryptedWord, csr) {
        try {
          const networkGovernanceBaseUrl = GetNetworkGovernanceUrl(network);
          const endpoint = networkGovernanceBaseUrl + ENROLL_CSR_URL;
          const headers = {
            Authorization: AUTHORIZATION_KEY,
          };
          const body = {
            enrollmentid: enrollmentID,
            secret: encryptedWord,
            csr: csr,
            channel: URL_CHANNEL_NAME,
          };
          const response = await fetch(endpoint, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body),
          });
          if (!response.ok) {
            const jsonData = await response.json();
            const finalResponse = JSON.stringify(jsonData);
            throw Error(
              "An error occurred while getting certificate" + finalResponse
            );
          } else {
            const responseData = await response.json();
            const cert = responseData.response.pubcert;
            return cert;
          }
        } catch (error) {
          throw Error("An error occurred while getting certificate" + error);
        }
      }
      
      /**
       * getSecret
      @param {string} enrollmentID - provide enrollment id in string format.
      */
      async function getSecret(enrollmentID) {
        try {
          function bufferToHex(buffer) {
            return Array.from(new Uint8Array(buffer))
              .map((b) => b.toString(16).padStart(2, "0"))
              .join("");
          }
          // Encode the input string as a Uint8Array
          const encoder = new TextEncoder();
          const data = encoder.encode(enrollmentID);
      
          // Hash the input using SHA-256
          const hashBuffer = await crypto.subtle.digest("SHA-256", data);
          const hash = bufferToHex(hashBuffer);
      
          // Define character sets
          const upperCaseLetters = UPPER_CASE_CHARACTERS;
          const lowerCaseLetters = LOWER_CASE_CHARACTERS;
          const specialCharacters = SPECIAL_CHARACTERS;
          const numbers = NUMBERS;
      
          // Combine all characters into one string
          const allCharacters =
            upperCaseLetters + lowerCaseLetters + specialCharacters + numbers;
      
          // Function to get a character from allCharacters based on hash value
          function getCharFromHash(hash, index) {
            const charIndex =
              parseInt(hash.slice(index * 2, index * 2 + 2), 16) %
              allCharacters.length;
            return allCharacters[charIndex];
          }
      
          // Ensure at least one character from each set is included
          let uniqueString = "";
          uniqueString +=
            upperCaseLetters[
              parseInt(hash.slice(0, 2), 16) % upperCaseLetters.length
            ];
          uniqueString +=
            lowerCaseLetters[
              parseInt(hash.slice(2, 4), 16) % lowerCaseLetters.length
            ];
          uniqueString +=
            specialCharacters[
              parseInt(hash.slice(4, 6), 16) % specialCharacters.length
            ];
          uniqueString += numbers[parseInt(hash.slice(6, 8), 16) % numbers.length];
      
          // Fill the rest of the string with characters from the hash
          for (let i = 4; i < 16; i++) {
            uniqueString += getCharFromHash(hash, i);
          }
          return uniqueString;
        } catch (error) {
          throw Error(
            "An error occurred while getting secret from enrollment ID " + error
          );
        }
      }
      
      /**
       * submitTransaction
      @param {string} network - provide network to which you want to submit transaction.
      @param {string} enrollmentID - provide enrollment id in string.
      @param {string} pemPrivateKey - Provide PEM format private key.
      @param {string} cert - Provide certificate.
      @param {string} channelName - provide channelName in string.
      @param {string} chainCodeName - provide chainCodeName in string.
      @param {string} transactionName - provide transactionName in string.
      @param {Array} transactionParams - Provide transactionParams in an array.
      */
      async function submitTransaction(
        network,
        enrollmentID,
        pemPrivateKey,
        cert,
        channelName,
        chainCodeName,
        transactionName,
        transactionParams
      ) {
        try {
          // console.log("hello transaction")
          // const domainName = "https://rpc-mumbai-test.kalp.network/transaction/v1";
          const domainName = "http://localhost:4000/transaction/v1";

          // console.log("hello transaction 1233", transaction)
      
          const proposalUrl = domainName + "/proposal";
          const endorsementUrl = domainName + "/endorse";
          const submitUrl = domainName + "/submit";
          const commitSubmitUrl = domainName + "/commitstatus";
          const privateKeyString = pemPrivateKey;
          //try change name from privatekey to pemPrivate key
          const transaction = {
            enrollmentID: enrollmentID,
            cert: cert,
            channelName: channelName,
            chainCodeName: chainCodeName,
            transactionName: transactionName,
            transactionParams: transactionParams,
          };
          //proposal
          var proposalData = await restCall(proposalUrl, transaction);
      
          var sigr = "";
          var sigs = "";
          const proposal = proposalData.message.proposal;
          const proposalBytes = await decodeBase64String(proposal);
          [sigr, sigs] = await signUsingElliptic(privateKeyString, proposalBytes);
          const signedProposal = {
            signedR: sigr,
            signedS: sigs,
            proposal: proposal,
          };
          //endorse
          var endorseData = await restCall(endorsementUrl, signedProposal);
      
          const endorse = endorseData.message.endorse;
          const endorsedProposalBytes = await decodeBase64String(endorse);
          [sigr, sigs] = await signUsingElliptic(
            privateKeyString,
            endorsedProposalBytes
          );
          const signedEndorsedProposal = {
            signedR: sigr,
            signedS: sigs,
            endorse: endorse,
          };
          //submit
          var submitData = await restCall(submitUrl, signedEndorsedProposal);
          const submit = submitData.message.submit;
          const submitProposalBytes = await decodeBase64String(submit);
          [sigr, sigs] = await signUsingElliptic(
            privateKeyString,
            submitProposalBytes
          );
          const signedCommitProposal = {
            signedR: sigr,
            signedS: sigs,
            submit: submit,
          };
          //commitstatus
          var statusData = await restCall(commitSubmitUrl, signedCommitProposal);
          function getTransactionId(statusData) {
            return statusData.message.transaction_id;
          }
          const transactionId = getTransactionId(statusData);
          return transactionId;
        } catch (error) {
          throw Error("An error occurred while submiting transaction " + error);
        }
      }
      
      async function submitTransaction1(
        network,
        enrollmentID,
        pemPrivateKey,
        cert,
        channelName,
        chainCodeName,
        transactionName,
        transactionParams
      ) {
        try {
          // console.log("hello transaction")
          // const domainName = "https://rpc-mumbai-test.kalp.network/transaction/v1";
          const domainName = "https://stg-kalp-gateway.p2eppl.com/transaction/v1";

          // console.log("hello transaction 1233", transaction)
      
          const proposalUrl = domainName + "/proposal";
          const endorsementUrl = domainName + "/endorse";
          const submitUrl = domainName + "/submit";
          const commitSubmitUrl = domainName + "/commitstatus";
          const privateKeyString = pemPrivateKey;
          //try change name from privatekey to pemPrivate key
          const transaction = {
            enrollmentID: enrollmentID,
            cert: cert,
            channelName: channelName,
            chainCodeName: chainCodeName,
            transactionName: transactionName,
            transactionParams: transactionParams,
          };
          //proposal
          var proposalData = await restCall(proposalUrl, transaction);
      
          var sigr = "";
          var sigs = "";
          const proposal = proposalData.message.proposal;
          const proposalBytes = await decodeBase64String(proposal);
          [sigr, sigs] = await signUsingElliptic(privateKeyString, proposalBytes);
          const signedProposal = {
            signedR: sigr,
            signedS: sigs,
            proposal: proposal,
          };
          //endorse
          var endorseData = await restCall(endorsementUrl, signedProposal);
      
          const endorse = endorseData.message.endorse;
          const endorsedProposalBytes = await decodeBase64String(endorse);
          [sigr, sigs] = await signUsingElliptic(
            privateKeyString,
            endorsedProposalBytes
          );
          const signedEndorsedProposal = {
            signedR: sigr,
            signedS: sigs,
            endorse: endorse,
          };
          //submit
          var submitData = await restCall(submitUrl, signedEndorsedProposal);
          const submit = submitData.message.submit;
          const submitProposalBytes = await decodeBase64String(submit);
          [sigr, sigs] = await signUsingElliptic(
            privateKeyString,
            submitProposalBytes
          );
          const signedCommitProposal = {
            signedR: sigr,
            signedS: sigs,
            submit: submit,
          };
          //commitstatus
          var statusData = await restCall(commitSubmitUrl, signedCommitProposal);
          function getTransactionId(statusData) {
            return statusData.message.transaction_id;
          }
          const transactionId = getTransactionId(statusData);
          return transactionId;
        } catch (error) {
          throw Error("An error occurred while submiting transaction " + error);
        }
      }
      
      /**
       * evaluateTransaction
      @param {string} network - provide network to which you want to evaluate transaction.
      @param {string} enrollmentID - provide enrollment id in string.
      @param {string} privateKeyString - Provide PEM format private key.
      @param {string} cert - Provide certificate.
      @param {string} channelName - provide channelName in string.
      @param {string} chainCodeName - provide chainCodeName in string.
      @param {string} transactionName - provide transactionName in string.
      @param {Array} transactionParams - Provide transactionParams in an array.
      */
      async function evaluateTransaction(
        network,
        enrollmentID,
        privateKeyString,
        cert,
        channelName,
        chainCodeName,
        transactionName,
        transactionParams
      ) {
        try {
          const domainName = GetKalpGatewayUrl(network);
          const proposalUrl = domainName + "/proposal";
          const evaluateUrl = domainName + "/evaluate";
          const transaction = {
            enrollmentID: enrollmentID,
            cert: cert,
            channelName: channelName,
            chainCodeName: chainCodeName,
            transactionName: transactionName,
            transactionParams: transactionParams,
          };
      
          const evaluateTransactionValue = await evaluateSignedTransaction(
            privateKeyString,
            proposalUrl,
            evaluateUrl,
            transaction
          );
          return evaluateTransactionValue;
        } catch (error) {
          throw Error("An error occurred while evaluating transaction :" + error);
        }
      }
      
      /**
       * evaluateTransaction
      @param {string} network - provide network to which you want to evaluate balance for.
      @param {string} enrollmentID - provide enrollment id in string.
      @param {string} privateKeyString - Provide PEM format private key.
      @param {string} cert - Provide certificate.
      @param {string} channelName - provide channelName in string.
      @param {string} chainCodeName - provide chainCodeName in string.
      @param {string} transactionName - provide transactionName in string.
      @param {Array} transactionParams - Provide transactionParams (enrollment id) in an array.
      */
      const evaluateBalance = async (
        network,
        enrollmentID,
        privateKeyString,
        cert,
        channelName,
        chainCodeName,
        transactionNameBalance,
        transactionParamsBalance
      ) => {
        try {
          const domainName = GetKalpGatewayUrl(network);
          const proposalUrl = domainName + "/proposal";
          const evaluateUrl = domainName + "/evaluate";
          const transaction = {
            enrollmentID: enrollmentID,
            cert: cert,
            channelName: channelName,
            chainCodeName: chainCodeName,
            transactionName: transactionNameBalance,
            transactionParams: transactionParamsBalance,
          };
      
          const balance = await evaluateSignedTransaction(
            privateKeyString,
            proposalUrl,
            evaluateUrl,
            transaction
          );
          return balance;
        } catch (error) {
          throw Error("An error occurred while getting balance :" + error);
        }
      };
      
      //Common logic for Evaluate transaction function
      async function evaluateSignedTransaction(
        privateKeyString,
        proposalUrl,
        evaluateUrl,
        transaction
      ) {
        try {
          var proposalData = await restCall(proposalUrl, transaction);
          var sigr = "";
          var sigs = "";
          const proposal = proposalData.message.proposal;
          const proposalBytes = await decodeBase64String(proposal);
          [sigr, sigs] = await signUsingElliptic(privateKeyString, proposalBytes);
          const signedProposal = {
            signedR: sigr,
            signedS: sigs,
            proposal: proposal,
          };
          var evaluateData;
          evaluateData = await restCall(evaluateUrl, signedProposal);
      
          const transactionEvaluate = evaluateData.message.evaluate;
          return transactionEvaluate;
        } catch (error) {
          throw Error("An error occurred while evaluateSignedTransaction :" + error);
        }
      }
      
      //restCall
      async function restCall(url, message) {
        try {
          const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": CONTENT_TYPE },
            body: JSON.stringify(message),
          });
          const responseData = await response.json();
          if (!response.ok) {
            if (responseData !== null || "") {
              throw Error(
                `An error occurred while pinging url: ${url},  message: ${JSON.stringify(
                  responseData
                )}`
              );
            }
            throw Error(`An error occurred while pinging url: ${url}`);
          } else {
            return responseData;
          }
        } catch (error) {
          throw Error("An error occurred in restCall :" + error);
        }
      }
      
      //base64string => []bytes , similar to golang
      async function decodeBase64String(base64String) {
        try {
          const base64Table = BASE_64_TABLE;
          // Prepare a map for reverse lookup
          const decodeMap = {};
          for (let i = 0; i < base64Table.length; i++) {
            decodeMap[base64Table[i]] = i;
          }
          decodeMap["="] = 0;
      
          // Decode Base64 string
          const data = new Uint8Array(base64String.length);
          let j = 0;
          for (let i = 0; i < base64String.length; i += 4) {
            const b1 = decodeMap[base64String[i]];
            const b2 = decodeMap[base64String[i + 1]];
            const b3 = decodeMap[base64String[i + 2]];
            const b4 = decodeMap[base64String[i + 3]];
            data[j] = (b1 << 2) | (b2 >> 4);
            j++;
            if (base64String[i + 2] !== "=") {
              data[j] = (b2 << 4) | (b3 >> 2);
              j++;
            }
            if (base64String[i + 3] !== "=") {
              data[j] = (b3 << 6) | b4;
              j++;
            }
          }
      
          return data.slice(0, j);
        } catch (error) {
          throw Error("An error occurred in decodeBase64String function:" + error);
        }
      }
      
      //exportPrivateKeyAsPem
      async function exportPrivateKeyAsPem(privateKey) {
        try {
          // Export the key
          const exportedKey = await crypto.subtle.exportKey(
            EXPORT_PRIVATE_KEY_FORMAT,
            privateKey
          );
      
          // Convert the exported key to PEM format
          const exportedAsString = String.fromCharCode.apply(
            null,
            new Uint8Array(exportedKey)
          );
          const exportedAsBase64 = btoa(exportedAsString);
          const pemExportedKey = `-----BEGIN PRIVATE KEY-----\n${exportedAsBase64}\n-----END PRIVATE KEY-----\n`;
      
          return pemExportedKey;
        } catch (error) {
          throw Error(
            "An error occurred in exportPrivateKeyAsPem function :" + error
          );
        }
      }
      
      //importPrivateKey
      async function importPrivateKey(pem) {
        try {
          const pemString = pem
            .replace(BEGIN_PRIVATE_KEY, "")
            .replace(END_PRIVATE_KEY, "");
          const binaryString = atob(pemString);
          const bytes = new Uint8Array(binaryString.length);
          for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
          }
          const privateKeyData = bytes.buffer;
          // Import the private key
          const privateKey = await crypto.subtle.importKey(
            EXPORT_PRIVATE_KEY_FORMAT,
            privateKeyData,
            {
              name: SIGN_ALGORITHM,
              namedCurve: NAMED_CURVE, // Assuming ECDSA with P-256 curve
            },
            true,
            [SIGN]
          );
          return privateKey;
        } catch (error) {
          throw Error("An error occurred in importPrivateKey function :" + error);
        }
      }
      
      //signUsingElliptic
      async function signUsingElliptic(privateKeyString, hashedBytesArray) {
        try {
          const elliptic = require("elliptic");
          const { KEYUTIL } = require("jsrsasign");
          const { prvKeyHex } = KEYUTIL.getKey(privateKeyString);
          const EC = elliptic.ec;
          const ecdsaCurve = elliptic.curves[P256_SIGN_CURVE];
          const Buffer = require("buffer").Buffer;
          const ecdsa = new EC(ecdsaCurve);
          const signKey = ecdsa.keyFromPrivate(prvKeyHex, KEY_PAIR_FORMAT_TYPE);
          const sig = ecdsa.sign(Buffer.from(hashedBytesArray), signKey);
          var sigr = "";
          var sigs = "";
          sigr = sig.r.toString();
          sigs = sig.s.toString();
          return [sigr, sigs];
        } catch (error) {
          throw Error("An error occurred in signUsingElliptic function:" + error);
        }
      }
      
      /**
       * createRandSUsingPrivateKey
      @param {string} privateKeyString - Provide PEM format private key.
      @param {string} proposal - Proposal in string format.
      */
      async function getRandSvalue(privateKeyString, proposal) {
        try {
          const privateKey = await importPrivateKey(privateKeyString);
          var sigr = "";
          var sigs = "";
          const proposalBytes = await decodeBase64String(proposal);
          [sigr, sigs] = await signUsingElliptic(privateKey, proposalBytes);
          return [sigr, sigs];
        } catch (error) {
          throw Error("An error occurred while getting R and S value :" + error);
        }
      }
      // const [inputValue, setInputValue] = useState('');

      // const handleInputChange = (event) => {
      //   setInputValue(event.target.value);
      // };
    
      const handleClickKYC = async () => {
     
        const privateKeyString = "-----BEGIN PRIVATE KEY-----\nMIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgVc2oc5pW7mejdQlY\nchLukxn+KgxDV1bMehrKkXGt37ChRANCAATm5xxYD9r5pp9IXvd5OWDiKe++eH6k\n+P0+mkp0OKIQSfX4WClMeExQ8fF9rvG4nNe37QGJ0tA1/iySxWjfJfIw\n-----END PRIVATE KEY-----\n"
        const publicKeyString = "-----BEGIN PUBLIC KEY-----\nMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE5uccWA/a+aafSF73eTlg4invvnh+\npPj9PppKdDiiEEn1+FgpTHhMUPHxfa7xuJzXt+0BidLQNf4sksVo3yXyMA==\n-----END PUBLIC KEY-----\n";
        const enrollmentId = "78b8bb4998813f39a582c0a29be132f24a653832";
        const cert =  "-----BEGIN CERTIFICATE-----\nMIIDazCCAxGgAwIBAgIUZGvFgQwqM4glZ1u7Puo4eTnTMdEwCgYIKoZIzj0EAwIw\ngbgxCzAJBgNVBAYTAlVTMREwDwYDVQQIEwhEZWxhd2FyZTFQME4GA1UEBxNHUDJF\nIExBQlMgTExDICAxMDA3IE4gT3JhbmdlIFN0LiA0dGggRmxvb3IgU3RlIDEzODIg\nV2lsbWluZ3RvbiBVLlMgMTk4MDExETAPBgNVBAoTCE1BSSBMYWJzMQ8wDQYDVQQL\nEwZjbGllbnQxIDAeBgNVBAMTF2thbHBzdGFnZW5ldDEtaW50LWFkbWluMB4XDTI0\nMDQwMzA3NDIwMFoXDTI1MDQwMzA3NDgwMFowgboxCzAJBgNVBAYTAlVTMREwDwYD\nVQQIEwhEZWxhd2FyZTFQME4GA1UEBxNHUDJFIExBQlMgTExDICAxMDA3IE4gT3Jh\nbmdlIFN0LiA0dGggRmxvb3IgU3RlIDEzODIgV2lsbWluZ3RvbiBVLlMgMTk4MDEx\nETAPBgNVBAoTCE1BSSBMYWJzMQ4wDAYDVQQLEwVhZG1pbjEjMCEGA1UEAwwaa2Fs\ncF9zdGFnZW5ldDEtc3VwZXItYWRtaW4wWTATBgcqhkjOPQIBBggqhkjOPQMBBwNC\nAATm5xxYD9r5pp9IXvd5OWDiKe++eH6k+P0+mkp0OKIQSfX4WClMeExQ8fF9rvG4\nnNe37QGJ0tA1/iySxWjfJfIwo4H0MIHxMA4GA1UdDwEB/wQEAwIHgDAMBgNVHRMB\nAf8EAjAAMB0GA1UdDgQWBBSnnyxRvy7HMHHluNJwuhfiTHC/DjAfBgNVHSMEGDAW\ngBRcR4QSSVDgTfN5sy2w8Rp4bYOjVzAUBgNVHREEDTALgglsb2NhbGhvc3QwewYI\nKgMEBQYHCAEEb3siYXR0cnMiOnsiYWRtaW4iOiJ0cnVlIiwiaGYuQWZmaWxpYXRp\nb24iOiIiLCJoZi5FbnJvbGxtZW50SUQiOiJrYWxwX3N0YWdlbmV0MS1zdXBlci1h\nZG1pbiIsImhmLlR5cGUiOiJhZG1pbiJ9fTAKBggqhkjOPQQDAgNIADBFAiEAjrW9\nFNkmc06bd7rIi1N56OHnpeZCwoMB6pIoAEtyJyUCIDxYp7fB/KqoRCimOtIgsKtd\nmuMi4I/EeXuukHBuNWeB\n-----END CERTIFICATE-----\n";
        const channelName = "kalp";
        const chainCodeName = "kyc"
        const transactionName = "CreateKycV1"
        const transactionParams =[`{"docType":"kyc","userId":"${inputValue}","kycId":"${inputValue}","kycHash":"","isAbove18":true,"isAbove21":true,"isAbove60":false,"gender":"Male","kycProvider":"OneTrust","region":"APAC","country":"India"}`]
        console.log("enrollmentID", enrollmentId);
        console.log("transactionParams", transactionParams);
        console.log("privateKeyString", privateKeyString);
        console.log("publicKeyString", publicKeyString);
        console.log("Cert", cert);
     
        try {
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
          const result = JSON.stringify(makeTransaction);
          console.log(`transaction data2: ${makeTransaction}`);
        } catch (error) {
          console.log(`error happenned while submitting transaction`,error)
        }
      };
  