import dynamic from "next/dynamic";

const CryptoJS = dynamic(() => import("crypto-js"), { ssr: false });

// เข้ารหัส (Encrypt)
export const cryptoEncode = async (data) => {
  if (!process.env.NEXT_PUBLIC_CRYPTO_SECRET_KEY) {
    throw new Error("key is not defined in .env");
  }

  if (typeof data === "object") {
    data = JSON.stringify(data);
  }

  const mod = await CryptoJS;
  const encrypted = mod.AES.encrypt(data, process.env.NEXT_PUBLIC_CRYPTO_SECRET_KEY).toString();
  return encrypted;
};

// ถอดรหัส (Decrypt)
export const cryptoDecode = async (encryptedText) => {
  if (!process.env.NEXT_PUBLIC_CRYPTO_SECRET_KEY) {
    throw new Error("key is not defined in .env");
  }

  const mod = await CryptoJS;
  const bytes = mod.AES.decrypt(encryptedText, process.env.NEXT_PUBLIC_CRYPTO_SECRET_KEY);
  return bytes.toString(mod.enc.Utf8);
};
