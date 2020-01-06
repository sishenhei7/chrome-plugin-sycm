import marketIndex from './tabs/marketIndex';
import '../styles/app.scss';

function addButtons() {
  const { host, pathname } = window.location;

  if (
    host.indexOf('localhost') > -1
    || (host === 'sycm.taobao.com' && pathname === '/mc/mq/overview')
  ) {
    marketIndex.init();
  }
}

window.onload = () => {
  console.log('init: 一面数据生意参谋插件');
  setInterval(() => {
    addButtons();
  }, 2000);
};
