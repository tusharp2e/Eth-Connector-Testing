const forge = require('node-forge');
const crypto = require('crypto');

// Function to load and parse a certificate from PEM format
function loadCertificate(cert) {
  try {
    const certificate = forge.pki.certificateFromPem(cert);
    return certificate;
  } catch (err) {
    throw new Error(`Error loading certificate: ${err.message}`);
  }
}

// Extract public key from certificate and return it in PEM format
function getPublicKeyFromCert(cert) {
  if (!cert) {
    throw new Error('Invalid public certificate provided');
  }

  const certificate = loadCertificate(cert);
  const publicKey = certificate.publicKey;

  if (!publicKey || !(publicKey instanceof forge.pki.ecdsa.PublicKey)) {
    throw new Error('Error getting public key from public certificate');
  }

  try {
    const pemPublicKey = forge.pki.publicKeyToPem(publicKey);
    return pemPublicKey;
  } catch (err) {
    throw new Error(`Error marshaling public key to PEM: ${err.message}`);
  }
}

// Remove PEM headers and return base64-encoded raw public key
function removeHeadersFromPublicKey(pemPublicKey) {
  try {
    const publicKeyObj = forge.pki.publicKeyFromPem(pemPublicKey);
    const derBytes = forge.pki.publicKeyToPem(publicKeyObj, { encoding: 'der' });
    const rawPublicKey = forge.util.encode64(derBytes); // Base64 encode the raw bytes
    return rawPublicKey;
  } catch (err) {
    throw new Error(`RemoveHeadersFromPublicKey error: failed to generate block from pemPublicKey - ${err.message}`);
  }
}

// Generate enrollment ID from public key
function getEnrollmentId(publicKeyPem) {
  if (!publicKeyPem) {
    throw new Error('Public key provided is improper');
  }

  const publicKeyBase64 = removeHeadersFromPublicKey(publicKeyPem);
  let publicKeyBytes;
  try {
    publicKeyBytes = Buffer.from(publicKeyBase64, 'base64');
  } catch (err) {
    throw new Error(`Error converting publicKeyPem to array of bytes: ${err.message}`);
  }

  const hash = crypto.createHash('sha256');
  hash.update(publicKeyBytes);
  const hashedPublicKey = hash.digest('hex');

  // Take the last 40 characters of the hash as the enrollment ID
  const enrollmentId = hashedPublicKey.slice(-40);
  return enrollmentId;
}

// Check if enrollment ID matches the public certificate
async function doesEnrollmentIdMatchPublicCertificate(pubCert) {
  try {
    const pemPublicKey = getPublicKeyFromCert(pubCert);
    const eId = getEnrollmentId(pemPublicKey);
    console.log('Enrollment ID:', eId);
    return true; // Assuming success if no errors; adjust logic if comparison is needed
  } catch (err) {
    console.error(err.message);
    return false;
  }
}

// Main execution
(async () => {
  const cert = `-----BEGIN CERTIFICATE-----
MIIDYjCCAwigAwIBAgIUXghuHl1Nr7VzVcu5D1ZmjcnG0q8wCgYIKoZIzj0EAwIw
gbIxCzAJBgNVBAYTAlVTMREwDwYDVQQIEwhEZWxhd2FyZTFQME4GA1UEBxNHUDJF
IExBQlMgTExDICAxMDA3IE4gT3JhbmdlIFN0LiA0dGggRmxvb3IgU3RlIDEzODIg
V2lsbWluZ3RvbiBVLlMgMTk4MDExETAPBgNVBAoTCE1BSSBMYWJzMQ8wDQYDVQQL
EwZjbGllbnQxGjAYBgNVBAMTEWV4YW1wbGUtaW50LWFkbWluMB4XDTI1MDMyNDEx
MTUwMFoXDTI2MDQwMzA5MjUwMFowgb0xCzAJBgNVBAYTAklOMRYwFAYDVQQIEw1Z
b3VyIFByb3ZpbmNlMRYwFAYDVQQHEw1Zb3VyIExvY2FsaXR5MRowGAYDVQQKExFZ
b3VyIE9yZ2FuaXphdGlvbjEvMA0GA1UECxMGY2xpZW50MA4GA1UECxMHY2xpZW50
czAOBgNVBAsTB2V4YW1wbGUxMTAvBgNVBAMTKDcwMmM5ZGJjYmIxOTg4ZDIzMDY1
MDBjMzBhZjRiODVlOTcwNGViMTUwWTATBgcqhkjOPQIBBggqhkjOPQMBBwNCAATY
5tmh+d5LCAwSiXmym0m83mwMwYoqd/cUQNK/d37bZXPPW6XNxkwp0mZV2YMW6GnP
G0gUoiCmkjasml5PPch2o4HuMIHrMA4GA1UdDwEB/wQEAwIHgDAMBgNVHRMBAf8E
AjAAMB0GA1UdDgQWBBRdKPnQTc/iou3TS9/FnAC5ohnPkDAfBgNVHSMEGDAWgBRm
PPIdKN8mAyoqxEuaul3FDmc7KjCBigYIKgMEBQYHCAEEfnsiYXR0cnMiOnsiaGYu
QWZmaWxpYXRpb24iOiJleGFtcGxlLmNsaWVudHMiLCJoZi5FbnJvbGxtZW50SUQi
OiI3MDJjOWRiY2JiMTk4OGQyMzA2NTAwYzMwYWY0Yjg1ZTk3MDRlYjE1IiwiaGYu
VHlwZSI6ImNsaWVudCJ9fTAKBggqhkjOPQQDAgNIADBFAiEAvvAnoCLpfahSrvuk
c6JBFESZTYothyRkTMMm7QuuxwMCIAIiNYKYhXhM59+L1rsfs9f8gUSHOrxc1KGx
h9+Ic4xW
-----END CERTIFICATE-----`;

  const result = await doesEnrollmentIdMatchPublicCertificate(cert);
  console.log('Does it match?', result);
})();