import { parseLocalStorage, decryptor } from '../utils/decrypt';
import { generateSeeButton } from '../utils/dom';
import { ymDialog } from '../components';

// 品牌分析
export default {
  init() {
    generateSeeButton({
      parent: '#shopAnalysisSelect .oui-card-header',
      buttonId: 'ym-shop-analysis-select',
      callback: () => this.overviewClick(),
    });

    generateSeeButton({
      parent: '#sycm-mc-flow-analysis .oui-card-header',
      buttonId: 'ym-shop-analysis-flow',
      callback: () => this.sourceClick(),
    });
  },
  overviewClick() {
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

      item['店铺名称'] = title;
      item['交易指数'] = tradeIndex ? Math.round(tradeIndex.value) : '-';
      item['流量指数'] = uvIndex ? Math.round(uvIndex.value) : '-';
      item['收藏人气'] = cltHits ? Math.round(cltHits.value) : '-';
      item['加购人气'] = cartHits ? Math.round(cartHits.value) : '-';
      item['支付转化指数'] = payRateIndex ? Math.round(payRateIndex.value) : '-';
      item['客群指数'] = payByrCntIndex ? Math.round(payByrCntIndex.value) : '-';
      tableData.unshift({ ...item });
    });

    const downloadConfig = {
      data: tableData,
      filename: '竞店对比.xlsx',
    };

    ymDialog.setState({ tableData, downloadConfig });
    ymDialog.open();
  },
  sourceClick() {
    const str = parseLocalStorage('mc/rivalShop/analysis/getLiveFlowSource.json');
    const { data } = decryptor(str);

    let id = 0;
    const tableData = [];
    const downloadFirstData = [];
    const downloadData = [];

    data.forEach((row) => {
      // 展示的数据
      id += 1;
      const item = this.generateRow(row, id);

      const childItem = [];
      row.children.forEach((childRow) => {
        id += 1;
        const childRowItem = this.generateRow(childRow, id);
        childItem.push({ ...childRowItem });
      });

      item.children = [...childItem];
      tableData.push({ ...item });

      // 下载的数据
      downloadFirstData.push(this.generateRow(row));
      const downloadChildItem = [];

      row.children.forEach((childRow) => {
        const childRowItem = this.generateRow(childRow);
        downloadChildItem.push({ ...childRowItem });
      });

      downloadData.push({
        data: childItem,
        name: item['流量来源'],
      });
    });

    downloadData.unshift({
      data: downloadFirstData,
      name: '入店来源',
    });

    const downloadConfig = {
      data: downloadData,
      filename: '入店来源.xlsx',
      isMultiple: true,
    };

    ymDialog.setState({ tableData, downloadConfig });
    ymDialog.open();
  },
  generateRow(rowData, id) {
    const {
      pageName,
      selfShopUvIndex,
      rivalShop1UvIndex,
      rivalShop2UvIndex,
      selfShopUv,
    } = rowData;

    const item = {};
    item.id = id;
    item['流量来源'] = pageName ? pageName.value : '-';
    item['流量指数(本店)'] = selfShopUvIndex ? Math.round(selfShopUvIndex.value) : '-';
    item['流量指数(竞店1)'] = rivalShop1UvIndex ? Math.round(rivalShop1UvIndex.value) : '-';
    item['流量指数(竞店2)'] = rivalShop2UvIndex ? Math.round(rivalShop2UvIndex.value) : '-';
    item['本店访问数'] = selfShopUv ? Math.round(selfShopUv.value) : '-';

    return item;
  },
};
