<template>
  <el-dialog
    class="ym-dialog"
    :title="title"
    :visible.sync="dialogVisible"
    width="50%"
  >
    <div
      v-if="downloadConfig"
      style="display: flex; justify-content: flex-end;"
    >
      <el-button
        type="primary"
        @click="handleDownload"
      >
        一面插件：点击导出
      </el-button>
    </div>
    <el-table
      v-if="tableData"
      :data="tableData"
      border
      fit
      style="width: 100%; margin-top: 10px;"
    >
      <el-table-column
        v-for="item in headerList"
        :key="item"
        :prop="item"
        :label="item"
        :width="item === '排名' ? 50 : ''"
      />
    </el-table>
  </el-dialog>
</template>
<script>
import Vue from 'vue';
import {
  Dialog,
  Button,
  Table,
  TableColumn,
} from 'element-ui';
import jsonToExcel from '../../utils/xlsx';

Vue.use(Dialog);
Vue.use(Button);
Vue.use(Table);
Vue.use(TableColumn);

export default {
  name: 'MyDialog',
  props: {
    title: {
      type: String,
      default: '一面插件',
    },
    tableData: {
      type: Array,
      default: null,
    },
    downloadConfig: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      dialogVisible: false,
    };
  },
  computed: {
    headerList() {
      if (!this.tableData || this.tableData.length < 1) {
        return [];
      }
      return Object.keys(this.tableData[0]);
    },
  },
  methods: {
    open() {
      this.dialogVisible = true;
    },
    close() {
      this.dialogVisible = false;
    },
    handleDownload() {
      jsonToExcel(this.downloadConfig);
    },
  },
};
</script>
