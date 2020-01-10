import marketIndex from './tabs/marketIndex';
import brandAnalysis from './tabs/brandAnalysis';
import marketRank from './tabs/marketRank';
import shopAnalysis from './tabs/shopAnalysis';
import proxyFetch from './utils/fetch';
import { loading } from './components';
import '../styles/app.scss';

function addButtons() {
  const { host, pathname } = window.location;

  if (host !== 'sycm.taobao.com') return;

  if (pathname === '/mc/mq/overview') {
    marketIndex.init();
  } else if (pathname === '/mc/ci/brand/analysis') {
    brandAnalysis.init();
  } else if (pathname === '/mc/mq/market_rank') {
    marketRank.init();
  } else if (pathname === '/mc/ci/shop/analysis') {
    shopAnalysis.init();
  }
}

window.onload = () => {
  console.log('init: 一面数据生意参谋插件');
  loading.open();
  setTimeout(() => {
    loading.close();
  }, 3000);
  setInterval(() => {
    proxyFetch.init();
    addButtons();
  }, 2000);
};
