import Popup from '../utils/popup';
import MyTable from '../utils/table';
import { parseLocalStorage, decryptor } from '../utils/decrypt';
import { generateDownloadButton } from '../utils/xlsx';
import { decimalFormat } from '../utils/util';
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
        button.addEventListener('click', () => this.handleOverviewButtonClick(popup));
        container.appendChild(button);
      }
    }
  },
  handleOverviewButtonClick(popup) {
    // const { tableData } = testData;
    const str = parseLocalStorage('mc/mq/supply/mkt/overview.json');
    const data = decryptor(str);

    const item = {};
    const tableData = [];
    const {
      seIpvUvHits,
      uv,
      cltByrCnt,
      cartByrCnt,
      payByrCntIndex,
      tradeIndex,
    } = data;

    item['类别'] = '值';
    item['搜索人气'] = seIpvUvHits ? Math.round(seIpvUvHits.value) : '-';
    item['访客数'] = uv ? Math.round(uv.value) : '-';
    item['收藏人数'] = cltByrCnt ? Math.round(cltByrCnt.value) : '-';
    item['加购人数'] = cartByrCnt ? Math.round(cartByrCnt.value) : '-';
    item['客群指数'] = payByrCntIndex ? Math.round(payByrCntIndex.value) : '-';
    item['交易指数'] = tradeIndex ? Math.round(tradeIndex.value) : '-';
    tableData.push({ ...item });

    item['类别'] = '相比前一日';
    item['搜索人气'] = seIpvUvHits ? decimalFormat(seIpvUvHits.cycleCrc) : '-';
    item['访客数'] = uv ? decimalFormat(uv.cycleCrc) : '-';
    item['收藏人数'] = cltByrCnt ? decimalFormat(cltByrCnt.cycleCrc) : '-';
    item['加购人数'] = cartByrCnt ? decimalFormat(cartByrCnt.cycleCrc) : '-';
    item['客群指数'] = payByrCntIndex ? decimalFormat(payByrCntIndex.cycleCrc) : '-';
    item['交易指数'] = tradeIndex ? decimalFormat(tradeIndex.cycleCrc) : '-';
    tableData.push({ ...item });

    const button = generateDownloadButton({
      data: tableData,
      filename: '市场大盘.xlsx',
    });

    popup.reset();
    popup.add(button);
    new MyTable('.ym-dialog', tableData);
    popup.show();
  },
};
