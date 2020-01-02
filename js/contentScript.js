import decryptor from './utils/decrypt';
import data from './utils/testData';

const tip = document.createElement('div');
tip.textContent = decryptor(data);

const app = document.getElementById('app');

if (app) {
  app.appendChild(tip);
}
