import Popup from '../utils/popup';
import MyTable from '../utils/table';
import { parseLocalStorage, decryptor } from '../utils/decrypt';
// import testData from '../utils/testData';

// 市场大盘
export default {
  init() {
    this.addOverviewButton();
  },
  addOverviewButton() {
    let button = document.querySelector('#ym-market-index-overview');

    if (!button) {
      const container = document.querySelector('#cateTrend .cardHeader');

      if (container) {
        button = document.createElement('button');
        button.id = 'ym-market-index-overview';
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

    const item = {};
    const tableData = [];

    item['类别'] = '值';
    item['搜索人气'] = data.seIpvUvHits.value;
    item['访客数'] = data.uv.value;
    item['收藏人数'] = data.cltByrCnt.value;
    item['加购人数'] = data.cartByrCnt.value;
    item['客群指数'] = data.payByrCntIndex.value;
    item['交易指数'] = data.tradeIndex.value;
    tableData.push({ ...item });

    item['类别'] = '相比前一日';
    item['搜索人气'] = data.seIpvUvHits.cycleCrc;
    item['访客数'] = data.uv.cycleCrc;
    item['收藏人数'] = data.cltByrCnt.cycleCrc;
    item['加购人数'] = data.cartByrCnt.cycleCrc;
    item['客群指数'] = data.payByrCntIndex.cycleCrc;
    item['交易指数'] = data.tradeIndex.cycleCrc;
    tableData.push({ ...item });

    popup.reset();
    new MyTable('.ym-dialog', tableData);
    popup.show();
  },
};
