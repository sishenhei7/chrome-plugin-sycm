import JSEncrypt from 'jsencrypt';

// 获取 token
export function getToken(key) {
  const meta = document.querySelector('meta[name=microdata]');
  const content = meta && meta.getAttribute && meta.getAttribute('content');
  let token = '';

  if (content) {
    const params = content.split(';');

    if (params.length) {
      params.forEach((item) => {
        const kv = item.split('=');

        if (kv[0] === key) {
          token = kv[1] || '';
        }
      });
    }
  }

  return token;
}

// 获取 url 上的 query
export function getQueryString(string) {
  const query = string || window.location.search.substr(1);
  const queryParams = query ? query.split('&') : [];
  const queryMap = {};

  queryParams.forEach((item) => {
    const [key, value] = item.split('=').map((code) => decodeURIComponent(code));

    if (key) {
      queryMap[key] = value;
    }
  });

  return queryMap;
}

// 获取 transit-id
export function getTansitId() {
  // eslint-disable-next-line
  const publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCJ50kaClQ5XTQfzkHAW9Ehi+iXQKUwVWg1R0SC3uYIlVmneu6AfVPEj6ovMmHa2ucq0qCUlMK+ACUPejzMZbcRAMtDAM+o0XYujcGxJpcc6jHhZGO0QSRK37+i47RbCxcdsUZUB5AS0BAIQOTfRW8XUrrGzmZWtiypu/97lKVpeQIDAQAB';

  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(publicKey);
  return encrypt.encrypt('w28Cz694s63kBYk4');
}
