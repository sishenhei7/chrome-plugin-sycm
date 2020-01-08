import Popup from '../utils/popup';
import MyTable from '../utils/table';
import { parseLocalStorage, decryptor } from '../utils/decrypt';
import { generateDownloadButton } from '../utils/xlsx';
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
        button.addEventListener('click', () => this.handleOverviewButtonClick(popup));
        container.appendChild(button);
      }
    }
  },
  handleOverviewButtonClick(popup) {
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
        const titleIndex = (Number(rivalBrand.substr(-1)) - 1);
        title = titles[titleIndex].innerText;
      } catch (error) {
        console.log('无法获得标题');
      }

      const {
        tradeIndex,
        uvIndex,
        seIpvUvHits,
        cltHits,
        cartHits,
        payRateIndex,
        payByrCntIndex,
      } = tempRivalBrand;

      item['类别'] = title;
      item['交易指数'] = tradeIndex ? Math.round(tradeIndex.value) : '-';
      item['流量指数'] = uvIndex ? Math.round(uvIndex.value) : '-';
      item['搜索人气'] = seIpvUvHits ? Math.round(seIpvUvHits.value) : '-';
      item['收藏人气'] = cltHits ? Math.round(cltHits.value) : '-';
      item['加购人气'] = cartHits ? Math.round(cartHits.value) : '-';
      item['支付转化指数'] = payRateIndex ? Math.round(payRateIndex.value) : '-';
      item['客群指数'] = payByrCntIndex ? Math.round(payByrCntIndex.value) : '-';
      tableData.unshift({ ...item });
    });

    const button = generateDownloadButton({
      data: tableData,
      filename: '品牌分析.xlsx',
    });

    popup.reset();
    popup.add(button);
    new MyTable('.ym-dialog', tableData);
    popup.show();
  },
};
