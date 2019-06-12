<template>
  <div class="roles_container">
    <my-bread :list="['权限管理', '角色列表']"></my-bread>
    <el-card>
      <el-button type="primary" @click="openAddDialog()">添加角色</el-button>
      <el-table :data="rloesList" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <div v-if="!scope.row.children.length" style="color:#ccc">
              该角色未分配权限
            </div>
            <el-row
              style="border-bottom:1px solid #ccc;"
              :style="{ 'border-top': i === 0 ? '1px solid #ccc' : 'none' }"
              v-for="(item, i) in scope.row.children"
              :key="item.id"
            >
              <el-col :span="4">
                <el-tag
                  closable
                  type="tag.type"
                  @close="delRights(scope.row, item.id)"
                  >{{ item.authName }}
                </el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <el-col :span="20">
                <el-row
                  :style="{
                    'border-top': subIndex === 0 ? 'none' : '1px solid #ccc'
                  }"
                  v-for="(subItem, subIndex) in item.children"
                  :key="subIndex.id"
                >
                  <el-col :span="6">
                    <el-tag
                      closable
                      type="success"
                      @close="delRights(scope.row, subItem.id)"
                      >{{ subItem.authName }}</el-tag
                    >
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <el-tag
                      v-for="sItem in subItem.children"
                      :key="sItem.id"
                      closable
                      @close="delRights(scope.row, sItem.id)"
                      type="warning"
                    >
                      {{ sItem.authName }}
                    </el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="roleName" label="角色名称"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button-group>
              <el-button
                type="primary"
                icon="el-icon-edit"
                @click="openEditDialog(scope.row)"
              ></el-button>
              <el-button
                type="primary"
                icon="el-icon-delete"
                @click="delRoles(scope.row.id)"
              >
              </el-button>
              <el-button
                type="primary"
                icon="el-icon-setting"
                @click="openRighsDialog(scope.row)"
              >
              </el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog title="添加角色" :visible.sync="addDialogFormVisible">
      <el-form
        :model="addForm"
        autocomplete="off"
        :rules="Rules"
        label-width="80px"
        ref="addForm"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="addForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="addForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRole()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑角色" :visible.sync="editDialogFormVisible">
      <el-form
        :rules="Rules"
        :model="editForm"
        label-width="80px"
        autocomplete="off"
        ref="editForm"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="editForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="editForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editRoles()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="分配权限" :visible.sync="rightDialogFormVisible">
      <el-tree
        :data="rightsTreeData"
        show-checkbox
        node-key="id"
        :default-expand-all="true"
        :default-checked-keys="checkedIdArr"
        :props="defaultProps"
        ref="tree"
      >
      </el-tree>

      <div slot="footer" class="dialog-footer">
        <el-button @click="rightDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="disRight()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import mixin from "./Rloes-Mixin.js";
export default {
  mixins: [mixin]
};
</script>

<style lang="less" scoped>
.el-card {
  margin-top: 15px;
  .el-row {
    padding: 10px 0;
    display: flex;
    align-items: center;
  }
  .el-tag {
    margin-right: 5px;
    margin-bottom: 5px;
  }
}
</style>
