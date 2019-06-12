export default {
    data() {
        return {
            rloesList: [],
            addDialogFormVisible:false,
            addForm: {
                roleName:"",
                roleDesc:""
            },
            Rules: {
                roleName: [{ required: true, trigger: "blur", message: "角色名必填" }],
                roleDesc: [{ required: true, trigger: "blur", message: "角色描述必填" }]
            },
            editDialogFormVisible: false,
            editForm: {
                roleName: "",
                roleDesc: ""
            },
            rightDialogFormVisible:false,
            rightsTreeData:[],
            defaultProps: {
                children: 'children',
                label: 'authName'
            },
            checkedIdArr:[],
            rightsRoleId:null
        }
    },
    created() {
        this.getData();
    },
    methods: {
        async openRighsDialog(row) {
            const {
                data:{data,meta}
            } = await this.$http.get("rights/tree");
            if (meta.status !== 200) 
                return this.$message.error("获取所有权限数据失败")
            this.rightsTreeData = data;
            
            let arr = []
            row.children.forEach(item => {
                item.children.forEach(subItem => {
                    subItem.children.forEach(sItem => {
                        arr.push(sItem.id); 
                    })
                })
            });
            this.checkedIdArr = arr;
            this.rightsRoleId = row.id;
            this.rightDialogFormVisible = true;
        },
        async disRight() {
            const checkedArr = this.$refs.tree.getCheckedKeys();
           
            const halfCheckedArr = this.$refs.tree.getHalfCheckedKeys();

            const arr = [...checkedArr,...halfCheckedArr];
            console.log(arr)
            const {
                data: { meta }
              } = await this.$http.post(`roles/${this.rightsRoleId}/rights`, {
                rids: arr.join(",")
              });
            if (meta.status !== 200) return this.$message.error("角色权限分配失败");
            this.rightDialogFormVisible = false;
            this.getData();
            this.$message.success("角色权限分配成功");

        },
        delRights(row,RightsId) {
            
            this.$confirm("亲，是否删除该角色?", "温馨提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
              })
                .then(async () => {
                  const {
                    data: { data,meta }
                  } = await this.$http.delete(`roles/${row.id}/rights/${RightsId}`);
                  if (meta.status !== 200) return this.$message.error("删除角色失败");
                  row.children = data
                })
                .catch(() => null);
        },
        openEditDialog(row) {
            this.editDialogFormVisible = true;
            this.$nextTick(() => {
              this.$refs.editForm.resetFields();
              this.editForm.id = row.id;
              this.editForm.roleName = row.roleName;
              this.editForm.roleDesc = row.roleDesc;
            });
          },
        editRoles() {
            this.$refs.editForm.validate(async valid => {
                if (valid) {
                    const {
                        data: {meta}
                    } = await this.$http.put(`roles/${this.editForm.id}`,{
                        roleName: this.editForm.roleName,
                        roleDesc: this.editForm.roleDesc
                    })
                    if (meta.status !== 200) return this.$message.error("编辑角色失败");
                    this.editDialogFormVisible = false;
                    this.getData();
                }
            })
        },
        delRoles(roleId) {
            this.$confirm("亲，是否删除该角色?", "温馨提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            })
              .then(async () => {
                const {
                  data: { meta }
                } = await this.$http.delete(`roles/${roleId}`);
                if (meta.status !== 200) return this.$message.error("删除角色失败");
                this.getData();
              })
              .catch(() => null);
          },
        openAddDialog() {
            this.addDialogFormVisible=true;
            this.$nextTick(() => {
                this.$refs.addForm.resetFields();
              });
        },
        addRole() {
            this.$refs.addForm.validate(async valid => {
                if (valid) {
                    const {
                        data: {meta}
                    } = await this.$http.post("/roles",this.addForm);
                    if (meta.status !== 201) return this.$message.error("添加失败")
                    this.getData();
                    this.addDialogFormVisible = false;
                }
            })
        },
        async getData() {
            const {
                data:{data,meta}
            } = await this.$http.get("roles");
            if (meta.status !== 200) return this.$message.error("获取失败")
            this.rloesList = data;
        }
    },
}