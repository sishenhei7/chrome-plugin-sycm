import axios from 'axios';
import Popup from '../utils/popup';
// import MyTable from '../utils/table';
import { getToken, getQueryString, getTansitId } from '../utils/util';
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
        button.addEventListener('click', () => this.handleButtonClick(popup));
        container.appendChild(button);
      }
    }
  },
  handleButtonClick(popup) {
    this.fetchRankData()
      .then((res) => {
        console.log('res', res);
        const data = decryptor(res.data);
        console.log('data', data);
        console.log('popup', popup);

        // Object.keys(data).forEach((rivalBrand, index) => {
        //   const item = {};
        //   let title = `品牌${index}`;
        //   const tempRivalBrand = data[rivalBrand];

        //   try {
        //     title = titles[index].innerText;
        //   } catch (error) {
        //     console.log('无法获得标题');
        //   }

        //   item['类别'] = title;
        //   item['交易指数'] = Math.round(tempRivalBrand.tradeIndex.value);
        //   item['流量指数'] = Math.round(tempRivalBrand.uvIndex.value);
        //   item['搜索人气'] = Math.round(tempRivalBrand.seIpvUvHits.value);
        //   item['收藏人气'] = Math.round(tempRivalBrand.cltHits.value);
        //   item['加购人气'] = Math.round(tempRivalBrand.cartHits.value);
        //   item['支付转化指数'] = Math.round(tempRivalBrand.payRateIndex.value);
        //   item['客群指数'] = Math.round(tempRivalBrand.payByrCntIndex.value);
        //   tableData.push({
        //     ...item
        //   });
        // });

        // popup.reset();
        // new MyTable('.ym-dialog', tableData);
        // popup.show();
      })
      .catch((err) => {
        console.log('marketRank error:', err);
      });
  },
  fetchRankData() {
    const token = getToken('legalityToken');
    const { dateRange, dateType, cateId, device, sellerType } = getQueryString();
    const pageSize = 20;
    const page = 1;
    const order = 'desc';
    const orderBy = 'tradeIndex';
    const indexCode = 'tradeIndex,tradeGrowthRange,payRateIndex';
    const _ = +(new Date());
    const transitId = getTansitId();

    let name = 'hotsale';
    const activeText = document.querySelector('.oui-card-header-item .oui-tab-switch-item-active').innerText;

    if (activeText === '高交易') {
      name = 'hotsale';
    } else if (activeText === '高流量') {
      name = 'hotsearch';
    } else if (activeText === '高意向') {
      name = 'hotpurpose';
    }

    return axios.get(`/mc/mq/mkt/rank/shop/${name}.json`, {
      params: {
        dateRange,
        dateType,
        pageSize,
        page,
        order,
        orderBy,
        cateId,
        device,
        sellerType,
        indexCode,
        _,
        token,
      },
      headers: {
        'transit-id': transitId,
      },
    });
  },
};
