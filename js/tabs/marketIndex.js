import { parseLocalStorage, decryptor } from '../utils/decrypt';
import { generateSeeButton } from '../utils/dom';
import { decimalFormat } from '../utils/util';
import { ymDialog } from '../components';

// 市场大盘
export default {
  init() {
    generateSeeButton({
      parent: '#cateTrend .cardHeader',
      buttonId: 'ym-market-index-overview',
      callback: () => this.overviewClick(),
    });
  },
  overviewClick() {
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

    item['类别'] = '当前值';
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

    const downloadConfig = {
      data: tableData,
      filename: '市场大盘.xlsx',
    };

    ymDialog.setState({ tableData, downloadConfig });
    ymDialog.open();
  },
};
