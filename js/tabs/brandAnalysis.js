import Popup from '../utils/popup';
import MyTable from '../utils/table';
import { parseLocalStorage, decryptor } from '../utils/decrypt';
// import testData from '../utils/testData';

// 品牌分析
export default {
  init() {
    this.addOverviewButton();
  },
  addOverviewButton() {
    let button = document.querySelector('#ym-brand-analysis-trend');

    if (!button) {
      const container = document.querySelector('#brandAnalysisTrend .cardHeader');

      if (container) {
        button = document.createElement('button');
        button.id = 'ym-brand-analysis-trend';
        button.className = 'ym-button ym-button-see';
        button.innerHTML = '一面插件：点击查看';

        const popup = new Popup();
        button.addEventListener('click', () => this.handleButtonClick(popup));
        container.appendChild(button);
      }
    }
  },
  handleButtonClick(popup) {
    // const { tableData } = testData;
    const str = parseLocalStorage('mc/rivalBrand/analysis/getCoreIndexes.json');
    const data = decryptor(str);

    const tableData = [];
    const titles = document.querySelectorAll('#brandAnalysisSelect .sycm-common-select-selected-title');

    Object.keys(data).forEach((rivalBrand, index) => {
      const item = {};
      let title = `品牌${index}`;
      const tempRivalBrand = data[rivalBrand];

      try {
        title = titles[index].innerText;
      } catch (error) {
        console.log('无法获得标题');
      }

      item['类别'] = title;
      item['交易指数'] = Math.round(tempRivalBrand.tradeIndex.value);
      item['流量指数'] = Math.round(tempRivalBrand.uvIndex.value);
      item['搜索人气'] = Math.round(tempRivalBrand.seIpvUvHits.value);
      item['收藏人气'] = Math.round(tempRivalBrand.cltHits.value);
      item['加购人气'] = Math.round(tempRivalBrand.cartHits.value);
      item['支付转化指数'] = Math.round(tempRivalBrand.payRateIndex.value);
      item['客群指数'] = Math.round(tempRivalBrand.payByrCntIndex.value);
      tableData.push({ ...item });
    });

    popup.reset();
    new MyTable('.ym-dialog', tableData);
    popup.show();
  },
};
