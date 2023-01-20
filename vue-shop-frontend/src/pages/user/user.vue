<template>
    <div>
        <el-form inline>
            <el-form-item>
                <el-input v-model="username" placeholder="请输入查询内容"  clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-button size="mini" type="primary" icon="el-icon-search" @click="onSearch">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button size="mini" type="success" icon="el-icon-check" @click="addUser">新增</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="user" style="width: 100%">
            <el-table-column type="index" label="#" width="80"></el-table-column>
            <el-table-column prop="username" label="账号"></el-table-column>
            <el-table-column prop="nickname" label="昵称"></el-table-column>
            <el-table-column prop="password" label="密码"></el-table-column>
            <el-table-column prop="deptName" label="所属部门"></el-table-column>
            <el-table-column prop="roleId" label="角色" :formatter="rolematter"> </el-table-column>
            <el-table-column label="修改" width="100">
                <!-- <el-button type="warning" icon="el-icon-edit" circle size="mini" @click="showDialog">
                </el-button>
                <el-button type="danger" icon="el-icon-delete" circle size="mini"></el-button> -->
            
             <template v-slot="{ row }">
                 <el-button type="warning" icon="el-icon-edit" circle size="mini" @click="editUser(row.id)"></el-button>
                <el-button type="danger" icon="el-icon-delete" circle size="mini"  @click="deleteSubmit(row.id)"></el-button>
             </template>
            
            
            </el-table-column>
        </el-table>
        <!-- 
                    page-count      设置页数按钮的个数  多余的部分用省略号代替
                    hide-on-single-page 只有1页的时候 隐藏其他分页
                    current_page 	当前选中的页面 默认是0，表示第一页
                    page-sizes      传递一个长度为x的数组，表示有x种选项。[100, 200, 300, 400]表示四个选项，每页显示 100 个，200 个，300 个或者 400 个
                    page-size       每页显示的个数
                    layout          组件布局
                        total       总页数     sizes   可以选择每页显示的条数  pager  显示页码
                    @size-change="handleSizeChange"  用户选择不同的页面展示条数
                    
               -->

        <!-- current-page.sync 同步更新currentPage值 -->
        <el-pagination :current-page.sync="page.currentPage" :page-sizes="page.pageSizes"
            :page-size.sync="page.pageSize" :total="page.total" :hide-on-singel-page="true" background
            layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" />
    </div>
</template>

<script>
import { userPage,DeleteUser,getRole } from '../../api/index'
export default{
    data(){
        return {
            username:'',
            roles:[],
            user:[],
            dialog:{
                dialogVisible: false,
                head:'修改用户信息',
                password:'',
            },
            page:{
                pageSizes:[10,20,30],
                pageSize:10,
                currentPage:1,
                total:0,
                pageCount:3
            }
        }
    },
    methods:{
        showDialog(){
            this.dialog.dialogVisible = true;
        },
        getUsers() {
            userPage({
                pno: this.page.currentPage,
                psize: this.page.pageSize,
                username:this.username
            }).then((res) => {
                let { code, data } = res.data;
                if (code == 200) {
                    this.user = data.list;
                    this.page.total = data.page.totalElements;
                }
            }).catch((err) => err)
        },
        handleSizeChange(){
            this.getUsers();
        },
        handleCurrentChange(){
            this.getUsers();
        },
        onSearch(){
            this.getUsers();
        },
        async deleteSubmit(id){
            if(id == 1){
                this.$message.warning('超级管理员不能被删除');
                return ;
            }else{
                let res = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

                if(res == 'confirm'){
                   let ress = await DeleteUser(id).catch(err => {console.log(err)});
                   let {code,msg} = ress.data;
                   if(code == 200){
                    this.getUsers();
                   }
                   this.$message({
                    message:msg,
                    type:code == 200 ? 'success' : 'warning', 
                   })
                }
            }


        },
        //前两个参数一定要有
        rolematter(row, column,cellValue) {
           for(var x of this.roles){
              if(x.id == cellValue){
                return x.name;
              }
           }
            return;
        },
        addUser() {
            this.$router.push({ name: 'addUser' });
        },
        editUser(uid){
            this.$router.push({name:'editUser', query:{id:uid}})
        }
    },
    created() {
        this.getUsers();
        getRole().then((res) => {
            let { code, data } = res.data;
            if (code == 200) {
                this.roles = data.list;
            }
        }).catch(err => err);
    },
    
}
</script>