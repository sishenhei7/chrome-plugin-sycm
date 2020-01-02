import CryptoJS from 'crypto-js';

const keyStr = 'w28Cz694s63kBYk4';
const ivStr = '4kYBk36s496zC82w';
const key = CryptoJS.enc.Utf8.parse(keyStr);
const iv = CryptoJS.enc.Utf8.parse(ivStr);

const decryptor = (data) => {
  const hex = CryptoJS.enc.Hex.parse(data);
  const ciphertext = CryptoJS.enc.Base64.stringify(hex);
  const cfg = {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  };

  return CryptoJS.AES
    .decrypt(ciphertext, key, cfg)
    .toString(CryptoJS.enc.Utf8)
    .toString();
};

export default decryptor;
