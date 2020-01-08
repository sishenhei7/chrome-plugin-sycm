export default class Popup {
  constructor() {
    this.overlay = null;
    this.dialog = null;
    this.init();
  }

  init() {
    const overlay = document.querySelector('.ym-overlay');
    const dialog = document.querySelector('.ym-dialog');
    if (dialog) {
      this.overlay = overlay;
      this.dialog = dialog;
      this.reset();
    } else {
      this.create();
    }
  }

  create() {
    const overlay = document.createElement('div');
    const close = document.createElement('button');
    const dialogWrapper = document.createElement('div');
    const dialog = document.createElement('div');

    overlay.className = 'ym-overlay';
    close.className = 'ym-dialog-close';
    close.innerHTML = '关闭';
    dialogWrapper.className = 'ym-dialog-wrapper';
    dialog.className = 'ym-dialog';

    overlay.appendChild(dialogWrapper);
    dialogWrapper.appendChild(close);
    dialogWrapper.appendChild(dialog);
    document.body.appendChild(overlay);

    close.addEventListener('click', () => {
      this.hide();
    });

    overlay.addEventListener('click', (e) => {
      if (e.target.classList.contains('ym-overlay')) {
        this.hide();
      }
    });

    this.overlay = overlay;
    this.dialog = dialog;
  }

  show() {
    this.overlay.classList.add('ym-overlay--show');
  }

  hide() {
    this.overlay.classList.remove('ym-overlay--show');
  }

  add(content) {
    this.dialog.appendChild(content);
  }

  reset() {
    while (this.dialog.hasChildNodes()) {
      const element = this.dialog.firstChild;
      this.dialog.removeChild(element);
    }
  }
}
