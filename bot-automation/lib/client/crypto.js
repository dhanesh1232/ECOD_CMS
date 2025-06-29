// utils/cryptoBrowser.js
// Helper: converts strings to ArrayBuffer
function strToBuffer(str) {
  return new TextEncoder().encode(str);
}

// Helper: converts ArrayBuffer to hex/base64
function bufferToBase64(buffer) {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)));
}

function base64ToBuffer(base64) {
  return Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
}

// 🔒 Encrypt
export async function encryptData(text) {
  const iv = crypto.getRandomValues(new Uint8Array(12)); // AES-GCM uses 12-byte IV
  const keyMaterial = await getKeyMaterial(
    process.env.NEXT_PUBLIC_ENCRYPT_SECRET
  );
  const key = await crypto.subtle.importKey(
    "raw",
    keyMaterial,
    "AES-GCM",
    false,
    ["encrypt"]
  );

  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    strToBuffer(text)
  );

  return JSON.stringify({
    iv: bufferToBase64(iv),
    data: bufferToBase64(encrypted),
  });
}

// 🔓 Decrypt
export async function decryptData(encryptedDataJson) {
  const { iv, data } = JSON.parse(encryptedDataJson);

  const ivBuffer = base64ToBuffer(iv);
  const dataBuffer = base64ToBuffer(data);
  const keyMaterial = await getKeyMaterial(
    process.env.NEXT_PUBLIC_ENCRYPT_SECRET
  );
  const key = await crypto.subtle.importKey(
    "raw",
    keyMaterial,
    "AES-GCM",
    false,
    ["decrypt"]
  );

  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: ivBuffer },
    key,
    dataBuffer
  );

  return new TextDecoder().decode(decrypted);
}

// Helper: turn string secret to key material
async function getKeyMaterial(secret) {
  const encoder = new TextEncoder();
  const hash = await crypto.subtle.digest("SHA-256", encoder.encode(secret));
  return hash; // 256-bit key
}
