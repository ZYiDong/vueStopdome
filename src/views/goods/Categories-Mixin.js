export default {
    data() {
        return {
            categoryList:[],
            reqParams:{
                pagenum:1,
                pagesize:5
            },
            total:0,
            addDialogFormVisible:false,
            addRules,
            addForm: {
                cat_id:0,
                cat_name:"",
                cat_level:0
            }
            

        }
    },
    created() {
        this.getData();
    },
    methods: {
        // addDialogFormVisible() {
        //     this.addDialogFormVisible=true;
        // },
        pager(newPage) {
            this.reqParams.pagenum = newPage;
            this.getData();
        },
        async getData() {
            const {
                data:{data,meta}
            } = await this.$http.get("categories",{params:this.reqParams});
            if (meta.status !== 200) return this.$message.error("获取失败");
            this.categoryList = data.result;
            this.total = Math.ceil(data.total / data.pagesize);

        }
    },
}