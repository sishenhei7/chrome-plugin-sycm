# chrome-plugin-sycm

生意参谋 chrome 插件，目前能够实现几个分类的数据获取和下载。

此项目已搬到我司 gitlab 上面，**这里的已经不再维护了**。

## Demo

![demo1](./images/demo1.png)
![demo2](./images/demo2.png)

## Develop

```
npm install
npm start
npm run build
```

## How to use

1. npm run build，插件会被打包到 ym-sycm-plugin 文件夹；
2. 打开 chrome 的扩展程序，并切换到开发者模式
3. 把 ym-sycm-plugin 文件夹拖进去即可

## 2020.3.31特别更新说明

本来以为在 chrome 插件里面拦截 fetch 请求是一件侥幸的事情，是 fetch 的特殊性造成的。然而当我试着去拦截 xhr 请求的时候，发现竟然也能成功。至此，已经可以实现在 chrome 插件里面拦截所有的请求了。所以，我这次把方法更新上去了，供以后开发时参考，相信对其它人也有用。（完整业务代码放在公司gitlab上面了，并不打算更上去）

拦截方法请查看这三个文件：[xhrHook.js](./js/xhrHook.js)，[fetchHook.js](./js/fetchHook.js)，[manifest.json](./manifest.json)

需要注意的是：```manifest.json```里面的```content_scripts```字段是填一个数组的，所以可以在这里把钩子插入到文档流里面去，并且还可以设置在```document_start```的时候插入，而不是```document_end```的时候~

