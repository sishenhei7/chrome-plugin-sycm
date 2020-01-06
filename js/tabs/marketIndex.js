import Popup from '../utils/popup';
import MyTable from '../utils/table';
import { parseLocalStorage, decryptor } from '../utils/decrypt';
// import testData from '../utils/testData';

// 市场大盘页的处理
export default {
  init() {
    this.addOverviewButton();
  },
  addOverviewButton() {
    let button = document.querySelector('#market-index-overview');

    if (!button) {
      const container = document.querySelector('#cateTrend .cardHeader');

      if (container) {
        button = document.createElement('button');
        button.id = 'market-index-overview';
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
    const str = parseLocalStorage('mc/mq/supply/mkt/overview.json');
    const data = decryptor(str);

    const tableData = {};
    tableData['搜索人气'] = data.seIpvUvHits;
    tableData['访客数'] = data.uv;
    tableData['收藏人数'] = data.cltByrCnt;
    tableData['加购人数'] = data.cartByrCnt;
    tableData['客群指数'] = data.payByrCntIndex;
    tableData['交易指数'] = data.tradeIndex;

    popup.reset();
    new MyTable('.ym-dialog', tableData);
    popup.show();
  },
};
