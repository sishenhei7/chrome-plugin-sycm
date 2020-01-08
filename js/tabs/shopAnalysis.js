import Popup from '../utils/popup';
import MyTable from '../utils/table';
import { parseLocalStorage, decryptor } from '../utils/decrypt';
// import testData from '../utils/testData';

// 品牌分析
export default {
  init() {
    this.addOverviewButton();
    this.addSourceButton();
  },
  addOverviewButton() {
    let button = document.querySelector('#ym-shop-analysis-select');

    if (!button) {
      const container = document.querySelector('#shopAnalysisSelect .oui-card-header');

      if (container) {
        button = document.createElement('button');
        button.id = 'ym-shop-analysis-select';
        button.className = 'ym-button ym-button-see';
        button.innerHTML = '一面插件：点击查看';

        const popup = new Popup();
        button.addEventListener('click', () => this.handleOverviewButtonClick(popup));
        container.appendChild(button);
      }
    }
  },
  handleOverviewButtonClick(popup) {
    // const { tableData } = testData;
    const str = parseLocalStorage('mc/rivalShop/analysis/getLiveCoreIndexes.json');
    const { data } = decryptor(str);

    const tableData = [];
    const titles = document.querySelectorAll('#shopAnalysisSelect .sycm-common-select-selected-title');

    Object.keys(data).forEach((shop, index) => {
      const item = {};
      let title = `店铺${index}`;
      const tempShop = data[shop];

      try {
        if (shop === 'selfShop') {
          title = titles[0].innerText;
        } else {
          const titleIndex = Number(shop.substr(-1));
          title = titles[titleIndex].innerText;
        }
      } catch (error) {
        console.log('无法获得标题');
      }

      const {
        tradeIndex,
        uvIndex,
        cltHits,
        cartHits,
        payRateIndex,
        payByrCntIndex,
      } = tempShop;

      item['类别'] = title;
      item['交易指数'] = tradeIndex ? Math.round(tradeIndex.value) : '-';
      item['流量指数'] = uvIndex ? Math.round(uvIndex.value) : '-';
      item['收藏人气'] = cltHits ? Math.round(cltHits.value) : '-';
      item['加购人气'] = cartHits ? Math.round(cartHits.value) : '-';
      item['支付转化指数'] = payRateIndex ? Math.round(payRateIndex.value) : '-';
      item['客群指数'] = payByrCntIndex ? Math.round(payByrCntIndex.value) : '-';
      tableData.unshift({ ...item });
    });

    popup.reset();
    new MyTable('.ym-dialog', tableData);
    popup.show();
  },
  addSourceButton() {
    let button = document.querySelector('#ym-shop-analysis-flow');

    if (!button) {
      const container = document.querySelector('#sycm-mc-flow-analysis .oui-card-header');

      if (container) {
        button = document.createElement('button');
        button.id = 'ym-shop-analysis-flow';
        button.className = 'ym-button ym-button-see';
        button.innerHTML = '一面插件：点击查看';

        const popup = new Popup();
        button.addEventListener('click', () => this.handleSourceButtonClick(popup));
        container.appendChild(button);
      }
    }
  },
  handleSourceButtonClick(popup) {
    // const { tableData } = testData;
    const str = parseLocalStorage('mc/rivalShop/analysis/getLiveFlowSource.json');
    const { data } = decryptor(str);

    const tableData = [];

    data.forEach((row) => {
      const {
        pageName,
        selfShopUvIndex,
        rivalShop1UvIndex,
        rivalShop2UvIndex,
        selfShopUv,
      } = row;

      const item = {};
      item['流量来源'] = pageName ? pageName.value : '-';
      item['流量指数(本店)'] = selfShopUvIndex ? Math.round(selfShopUvIndex.value) : '-';
      item['流量指数(竞店1)'] = rivalShop1UvIndex ? Math.round(rivalShop1UvIndex.value) : '-';
      item['流量指数(竞店2)'] = rivalShop2UvIndex ? Math.round(rivalShop2UvIndex.value) : '-';
      item['本店访问数'] = selfShopUv ? Math.round(selfShopUv.value) : '-';
      tableData.push({ ...item });
    });

    popup.reset();
    new MyTable('.ym-dialog', tableData);
    popup.show();
  },
};
