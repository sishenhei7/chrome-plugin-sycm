/* eslint-disable */
class FetchHook {
  constructor() {
    this.init();
  }

  init() {
    const content = this.getScript();
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.text = content;
    document.documentElement.appendChild(script);

    console.log('proxyFetch init-----------');
  }

  getScript() {
    return (`
      function fetch_before(_then, _path, _payload) {
        getFilterItem(_then, "before").reverse().forEach(function (_item) {
          return _item(_path, _payload);
        });
      }

      function fetch_done(_filter, _payload, _cb) {
        dealFilter(_payload, getFilterItem(_filter, "then"), _cb);
      }

      function fetch_fail(_filter, _payload, _cb) {
        dealFilter(_payload, getFilterItem(_filter, "fail"), _cb);
      }

      function getFilterItem(_filter, key) {
        return _filter.filter(function (item) {
          return item["hasOwnProperty"](key);
        }).map(function (el) {
          return el[key];
        });
      }

      function dealFilter(_payload, _filter, _cb) {
        var filter = _filter[0];
        filter ? filter.apply(undefined, _payload["concat"](
          [
            function (_response) {
              _response && (_payload[0] = _response), dealFilter(_payload, _filter["slice"](1),
              _cb);
            }
          ]
        )) : _cb(_payload[0]);
      }

      function handleData(response) {
        // console.log(response.url);
        var arr = [
          '/mc/common/getShopCate.json',
          '/mc/live/ci/shop/monitor/listShop.json',
          '/mc/ci/shop/monitor/listShop.json',
          '/mc/rivalShop/analysis/getLiveTopItems.json',
          '/mc/rivalShop/analysis/getTopItems.json',
          '/mc/ci/config/rival/shop/getMonitoredList.json',
          '/mc/ci/config/rival/item/getMonitoredList.json',
          '/mc/ci/config/rival/brand/getMonitoredList.json',
          '/mc/mq/prop/listPropShop.json',
          '/mc/mq/prop/listPropItem.json',
          '/flow/v3/monitor/shop/listAll.json',
          '/flow/v3/monitor/item/listAll.json'
        ];
        for (var i = 0; i < arr.length; i++) {
          var _reg = new RegExp(arr[i]);
          if (_reg.test(response.url)) {
            ;
            (function (i) {
              response.json().then(function (res) {
                // console.log(arr, arr[i], i);
                localStorage.setItem(arr[i], JSON.stringify(res));
              });
            })(i);
          }
        }
        var rank = ['/mc/mq/mkt/rank/shop/hotsale.json', '/mc/mq/mkt/rank/shop/hotsearch.json',
            '/mc/mq/mkt/rank/item/hotsale.json', '/mc/mq/mkt/rank/item/hotsearch.json',
            '/mc/mq/mkt/rank/item/hotpurpose.json', '/mc/mq/mkt/rank/brand/hotsale.json',
            '/mc/mq/mkt/rank/brand/hotsearch.json'
          ],
          _type = '',
          _mc = '';
        for (var i = 0; i < rank.length; i++) {
          var _reg = new RegExp(rank[i]),
            _url = response.url;
          if (_reg.test(_url)) {
            ;
            (function (i) {
              let params = '';
              try {
                params += _url.match(/dateRange=([0-9-%C]+)&?/)[1];
                params += _url.match(/device=([0-9-]+)?/)[1];
                params += _url.match(/sellerType=([0-9-]+)?/)[1];
                params += _url.match(/token=([0-9a-zA-Z]+)?/)[1];
              } catch (e) {}
              response.json().then(function (res) {
                res.mc_key = params;
                localStorage.setItem(rank[i], JSON.stringify(res));
              });
            })(i);
          }
        }
      }

      var fetch_then = [{
        'then': function (a, b, c, d, e) {
          var response = a.clone();
          handleData(response);
          e();
        }
      }];

      var loop_error = "Bouncing between rejected and resolved, stopping loop",
        ori_fetch = window["fetch"];

      window["fetch"] = function (req_path, payload) {
        return new Promise(function (resolve, reject) {

          fetch_before(fetch_then, req_path, payload);

          var _promise = ori_fetch(req_path, payload);

          _promise.then(function (result) {
            var do_error = function () {
                throw reject(loop_error), new Error(loop_error);
              },
              _callback = function (res) {
                fetch_fail(fetch_then, [res, req_path, payload, do_error], function () {
                  return reject(res);
                });
              };

            fetch_done(fetch_then, [result, req_path, payload, _callback], function (
              res) {
              return resolve(res);
            });
          });

          _promise.catch(function (result) {
            var do_error = function () {
                throw reject(result), new Error(loop_error);
              },
              _callback = function (res) {
                fetch_done(fetch_then, [res, req_path, payload, do_error], function (
                  res) {
                  return resolve(res);
                });
              };
            fetch_fail(fetch_then, [result, req_path, payload, _callback], function () {
              return reject(result);
            });
          });
        });
      };
    `);
  }
}

new FetchHook();
