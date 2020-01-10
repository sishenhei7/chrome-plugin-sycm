import Vue from 'vue';
import Button from './Button.vue';

export default class ShowButton {
  constructor(selector, config) {
    this.selector = selector;
    this.button = null;
    this.init(config);
  }

  init(config) {
    const MyButton = Vue.extend(Button);
    this.button = new MyButton().$mount(this.selector);

    Object.keys(config).forEach((key) => {
      console.log('key', key);
      this.button[key] = config[key];
    });
  }
}
