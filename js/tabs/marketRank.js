// import axios from 'axios';
import Popup from '../utils/popup';
import MyTable from '../utils/table';
// import { getToken, getQueryString, getTansitId } from '../utils/util';
import { decryptor } from '../utils/decrypt';

// 市场排行
export default {
  init() {
    this.addOverviewButton();
  },
  addOverviewButton() {
    let button = document.querySelector('#ym-market-rank');

    if (!button) {
      const container = document.querySelector('.oui-card-header-wrapper .oui-card-header:not(.cardHeader)');

      if (container) {
        button = document.createElement('button');
        button.id = 'ym-market-rank';
        button.className = 'ym-button ym-button-see';
        button.innerHTML = '一面插件：点击查看';

        const popup = new Popup();
        button.addEventListener('click', () => this.handleOverviewButtonClick(popup));
        container.appendChild(button);
      }
    }
  },
  handleOverviewButtonClick(popup) {
    const tabName = document.querySelector('.sycm-mc-filter-wrapper .oui-tab-switch-item-active').innerText;
    const cardName = document.querySelector('.oui-card-header-item .oui-tab-switch-item-active').innerText;

    let tabType = 'shop';
    if (tabName === '店铺') {
      tabType = 'shop';
    } else if (tabName === '商品') {
      tabType = 'item';
    } else if (tabName === '品牌') {
      tabType = 'brand';
    }

    let cardType = 'hotsale';
    if (cardName === '高交易') {
      cardType = 'hotsale';
    } else if (cardName === '高流量') {
      cardType = 'hotsearch';
    } else if (cardName === '高意向') {
      cardType = 'hotpurpose';
    }

    const str = window.localStorage[`/mc/mq/mkt/rank/${tabType}/${cardType}.json`];
    const data = decryptor(JSON.parse(str).data);
    const slicedData = data.sort((a, b) => a.cateRankId.value - b.cateRankId.value).slice(0, 20);
    const tableData = this.generateOverviewTableData(slicedData, tabType, cardType);

    popup.reset();
    new MyTable('.ym-dialog', tableData);
    popup.show();
  },
  generateOverviewTableData(data, tabType, cardType) {
    const tableData = [];

    data.forEach((dataItem, index) => {
      const tableItem = {};
      const {
        item,
        shop,
        brandModel,
        tradeIndex,
        tradeGrowthRange,
        payRateIndex,
        uvIndex,
        seIpvUvHits,
        cltHits,
        cartHits,
      } = dataItem;

      tableItem['排名'] = index + 1;

      if (tabType === 'shop') {
        tableItem['店铺'] = shop ? shop.title : '-';
      } else if (tabType === 'item') {
        tableItem['商品'] = item ? item.title : '-';
        tableItem['所属店铺'] = shop ? shop.title : '-';
      } else if (tabType === 'brand') {
        tableItem['品牌'] = brandModel ? brandModel.brandName : '-';
      }

      if (cardType === 'hotsale') {
        tableItem['交易指数'] = tradeIndex ? Math.round(tradeIndex.value) : '-';
        tableItem['交易增长幅度'] = tradeGrowthRange ? tradeGrowthRange.value.toFixed(4) : '-';
        tableItem['支付转化指数'] = payRateIndex ? Math.round(payRateIndex.value) : '-';
      } else if (cardType === 'hotsearch') {
        tableItem['流量指数'] = uvIndex ? Math.round(uvIndex.value) : '-';
        tableItem['搜索人气'] = seIpvUvHits ? Math.round(seIpvUvHits.value) : '-';
        tableItem['交易指数'] = tradeIndex ? Math.round(tradeIndex.value) : '-';
      } else if (cardType === 'hotpurpose') {
        tableItem['收藏人气'] = cltHits ? Math.round(cltHits.value) : '-';
        tableItem['加购人气'] = cartHits ? Math.round(cartHits.value) : '-';
        tableItem['交易指数'] = tradeIndex ? Math.round(tradeIndex.value) : '-';
      }

      tableData.push({
        ...tableItem,
      });
    });

    return tableData;
  },
  // fetchRankData() {
  //   const token = getToken('legalityToken');
  //   const { dateRange, dateType, cateId, device, sellerType } = getQueryString();
  //   const pageSize = 20;
  //   const page = 1;
  //   const order = 'desc';
  //   const orderBy = 'tradeIndex';
  //   const indexCode = 'tradeIndex,tradeGrowthRange,payRateIndex';
  //   const _ = +(new Date());
  //   const transitId = getTansitId();

  //   let name = 'hotsale';
  //   const activeText = document.querySelector(
  //     '.oui-card-header-item .oui-tab-switch-item-active').innerText;

  //   if (activeText === '高交易') {
  //     name = 'hotsale';
  //   } else if (activeText === '高流量') {
  //     name = 'hotsearch';
  //   } else if (activeText === '高意向') {
  //     name = 'hotpurpose';
  //   }

  //   return axios.get(`/mc/mq/mkt/rank/shop/${name}.json`, {
  //     params: {
  //       dateRange,
  //       dateType,
  //       pageSize,
  //       page,
  //       order,
  //       orderBy,
  //       cateId,
  //       device,
  //       sellerType,
  //       indexCode,
  //       _,
  //       token,
  //     },
  //     headers: {
  //       'transit-id': transitId,
  //     },
  //   });
  // },
};
