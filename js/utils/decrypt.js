import CryptoJS from 'crypto-js';
import swal from 'sweetalert';

export function parseLocalStorage(path) {
  let data = '';

  try {
    const reg = new RegExp(path);
    const keyList = (localStorage.__q__ || '').split('|').reverse();
    const tempKey = keyList.find((item) => reg.test(item));
    data = JSON.parse(localStorage[decodeURIComponent(tempKey)]);
  } catch (error) {
    swal('错误!', `解析localstorage发生问题：${path}`, 'error');
    throw new Error(`解析localstorage发生问题：${path}`);
  }

  return JSON.parse(data.split('|')[1]).value._d;
}

export function decryptor(data) {
  const keyStr = 'w28Cz694s63kBYk4';
  const ivStr = '4kYBk36s496zC82w';

  let result = {};
  try {
    const key = CryptoJS.enc.Utf8.parse(keyStr);
    const iv = CryptoJS.enc.Utf8.parse(ivStr);
    const hex = CryptoJS.enc.Hex.parse(data);

    const ciphertext = CryptoJS.enc.Base64.stringify(hex);
    const cfg = {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    };

    const decodedStr = CryptoJS.AES
      .decrypt(ciphertext, key, cfg)
      .toString(CryptoJS.enc.Utf8)
      .toString();
    result = JSON.parse(decodedStr);
  } catch (error) {
    swal('错误!', 'AES解密发生问题', 'error');
    throw new Error('AES解密发生问题');
  }

  console.log('data:', result);
  return result;
}
