<template>
  <el-button
    type="primary"
    @click="handleClick"
  >
    {{ title }}
  </el-button>
</template>
<script>
import Vue from 'vue';
import { Button } from 'element-ui';

Vue.use(Button);

export default {
  name: 'ShowButton',
  props: {
    title: {
      type: String,
      default: '一面插件：点击查看',
    },
    callback: {
      type: Function,
      default: null,
    },
  },
  methods: {
    handleClick() {
      if (typeof this.callback === 'function') {
        this.callback();
      }
    },
  },
};
</script>
