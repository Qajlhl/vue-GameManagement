<template>
    <div>
        <el-form ref="form" :model="user" :rules="rules" label-width="80px">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="user.username" readonly></el-input>
            </el-form-item>
            <el-form-item label="昵称" prop="nickname">
                <el-input v-model="user.nickname"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="user.password" type="password" show-password></el-input>
            </el-form-item>
            <el-form-item label="所属部门" prop="depts">
                <el-select v-model="user.deptId" placeholder="请选择所属部门">
                    <el-option v-for="obj in depts" :label="obj.name" :value="obj.id" :key="obj.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="职位" props="role">
                <el-select v-model="user.roleId" placeholder="请选择职位">
                    <el-option v-for="obj in roles" :label="obj.name" :value="obj.id"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item>
                <!-- 传递的form参数一定要加单引号 -->
                <el-button type="primary" @click="onSubmit('form')">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { getRole,getDept,updateUser } from '../api/index'
    export default {
        data(){
            return{
                user:{
                    username:'',
                    nickname:'',
                    password:'',
                    roleId:'',
                    deptId:'',
                },
                depts:[],
                roles:[],
                rules: {
                    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                    nickname:[{required: true,message:'请输入昵称',trigger:'blur'}],
                    password: [{ required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 16, message: '密码长度在6-16位之间', trigger: 'blur' }],
                    deptId:[{required:true,message:'请选择您的所属部门',trigger:'blur'}],
                    roleId:[{required:true,message:'请指定您的角色',trigger:'blur'}],
                }

            }
        },
        created(){
            this.user = JSON.parse(sessionStorage.getItem('userInfo'));
            getRole().then((ress) =>{
                let {code,data} = ress.data;
                if(code == 200){
                    this.roles = data.list;
                }
            }).catch((err) => {
                console.log(err);
            });
            getDept().then((res) =>{
                let {code,data} = res.data;
                if(code == 200){
                    this.depts = data.list;
                }
            }).catch((err) => {
                console.log(err);
            });
        },
        methods:{
          async onSubmit(renew){
            // 返回一个boolean值
            let valid = await this.$refs[renew].validate().catch((_) => false);
            if(valid){
                //验证通过
                let New = this.user;
                delete New.deptName;
                // updateUser是一个异步函数   返回最新的数据
                let res = await updateUser(New);
                let {code,msg} = res.data;
                if(code == 200){
                    // 请求成功 更新vuex和sessionStorage
                    this.$message.success(msg);
                    this.$store.commit('newUser',New);
                    sessionStorage.setItem('userInfo',JSON.stringify(New));
                    // 跳转回主页
                    this.$router.push('/');
                }
            }
        }
        }
    }
</script>

<style scoped>

</style>