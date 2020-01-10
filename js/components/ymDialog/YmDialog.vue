<template>
  <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="30%"
  >
    <span>这是一段信息</span>
    <span>{{ haha }}</span>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button
        type="primary"
        @click="dialogVisible = false"
      >确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import Vue from 'vue';
import { Dialog, Button } from 'element-ui';

Vue.use(Dialog);
Vue.use(Button);

export default {
  name: 'MyDialog',
  props: {
    haha: {
      type: String,
      default: 'haha',
    },
  },
  data() {
    return {
      dialogVisible: false,
    };
  },
  methods: {
    open() {
      this.dialogVisible = true;
    },
    close() {
      this.dialogVisible = false;
    },
  },
};
</script>
