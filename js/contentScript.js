// import swal from 'sweetalert';
import decryptor from './utils/decrypt';
import testData from './utils/testData';
import MyTable from './utils/table';

const tip = document.createElement('div');
tip.textContent = decryptor(testData.encryptedData);

const app = document.getElementById('app');

if (app) {
  app.appendChild(tip);
  new MyTable('app', testData.tableData);
}

// 主动发送消息给后台
// 要演示此功能，请打开控制台主动执行sendMessageToBackground()
// function sendMessageToBackground(message) {
//   // eslint-disable-next-line
//   chrome.runtime.sendMessage({
//     greeting: message || '你好，我是content-script呀，我主动发消息给后台！',
//   }, (response) => {
//     console.log(`收到来自后台的回复：${response}`);
//   });
// }

// window.onload = () => {
//   console.log('onloadonloadonloadonloadonload');
//   setTimeout(() => {
//     sendMessageToBackground();
//   }, 500);
// };

// console.log('fsadfafas');
// setTimeout(() => {
//   console.log('swalswalswal');
//   swal('Good job!', 'You clicked the button!', 'success');
// }, 2000);
window.onload = () => {
  console.log('onloadonloadonload++++');
};
