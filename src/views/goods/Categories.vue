<template>
  <div class="category_contianer">
    <my-bread :list="['商品管理', '商品分类']"></my-bread>
    <el-card>
      <el-button type="warning" @click="addDialogFormVisible()"
        >添加分类</el-button
      >
      <el-table
        border
        :data="categoryList"
        style="width: 100%;"
        row-key="cat_id"
      >
        <el-table-column prop="cat_name" label="分类名称"> </el-table-column>
        <el-table-column prop="cat_deleted" label="是否有效">
          <template slot-scope="scope">
            <i
              class="el-icon-success"
              style="color:green"
              v-if="!scope.row.cat_deleted"
            ></i>
            <i
              class="el-icon-error"
              style="color:red"
              v-if="scope.row.cat_deleted"
            ></i>
          </template>
        </el-table-column>
        <el-table-column prop="cat_level" label="分类等级">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.cat_level == 0">一级分类</el-tag>
            <el-tag type="success" v-if="scope.row.cat_level == 1"
              >二级分类</el-tag
            >
            <el-tag type="warning" v-if="scope.row.cat_level == 2"
              >三级分类</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <el-button type="primary" icon="el-icon-edit" circle></el-button>
          <el-button type="danger" icon="el-icon-delete" circle></el-button>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :current-page="reqParams.pagenum"
        :page-count="total"
        @current-change="pager"
      >
      </el-pagination>
    </el-card>
    <el-dialog title="添加商品分类" :visible.sync="addDialogFormVisible">
      <el-form
        :model="addForm"
        autocomplete="off"
        :rules="Rules"
        label-width="80px"
        ref="addForm"
      >
        <el-form-item label="父级分类"> </el-form-item>
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="addForm.cat_name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCate()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import mixin from "./Categories-Mixin";
export default {
  mixins: [mixin]
};
</script>

<style lang="less" scoped>
.el-card {
  margin-top: 15px;
}
</style>
