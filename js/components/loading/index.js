import { Loading } from 'element-ui';

class MyLoading {
  constructor() {
    this.loadingInstance = null;
  }

  open() {
    this.loadingInstance = Loading.service({
      lock: true,
      fullscreen: true,
      background: 'rgba(0, 0, 0, 0.7)',
    });
  }

  close(callback) {
    setTimeout(() => {
      this.loadingInstance.close();

      if (typeof callback === 'function') {
        callback();
      }
    }, 50);
  }
}

export default new MyLoading();
