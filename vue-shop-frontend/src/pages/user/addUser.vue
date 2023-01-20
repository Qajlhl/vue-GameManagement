<template>
    <div>
        <el-page-header @back="goBack" content="详情页面"></el-page-header>
        <el-form :model="newUser" :rules="rules" ref="form" label-width="80px" :style="{marginTop:'10px'}">
             <el-form-item label="账号" prop="username">
                <el-input v-model="newUser.username" placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item label="昵称" prop="nickname">
                <el-input v-model="newUser.nickname" placeholder="请输入昵称"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="newUser.password" placeholder="请输入密码" show-password clearable></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkpass">
                <el-input v-model="newUser.checkpass" placeholder="请确认密码" show-password clearable></el-input>
            </el-form-item>
            <el-form-item label="所属部门" prop="deptId">
                <el-select v-model="newUser.deptId" placeholder="所属部门">
                    <el-option v-for="obj in depts" :label="obj.name" :value="obj.id" :key="obj.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="角色" prop="roleId">
                <el-select v-model="newUser.roleId" placeholder="角色">
                    <el-option v-for="obj in roles" :label="obj.name" :value="obj.id" :key="obj.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit('form')">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import { MessageBox } from 'element-ui';
import { getDept, getRole,userPage,insertUser } from '../../api/index'
    export default {
        data(){
        var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (value.length<6){
          callback(new Error('密码长度必须大于6'));
        } else {
            if (this.newUser.checkpass !== '') {
                this.$refs.form.validateField('checkpass');
            }
        }
         callback();
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.newUser.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
            return{
                newUser:{
                    username:'',
                    nickname:'',
                    password:'',
                    checkpass:'',
                    roleId:'',
                    deptId:'',
                },
                depts:[],
                roles:[],
                rules:{
                    username: [{ required: true, message: '请输入账号名', trigger: 'blur' }],
                    nickname: [{ required: true, message: '请输入昵称', trigger: 'blur' },
                    { min: 1, message: '昵称长度必须要大于1', trigger: 'blur' }
                    ],
                    password: [{ validator: validatePass,trigger: 'blur' },],
                    checkpass: [{ validator: validatePass2,trigger: 'blur' },],
                    roleId: [{ required: true, message: '请选择角色', trigger: 'blur' }],
                    deptId: [{ required: true, message: '请选择部门', trigger: 'blur' }],
                },
            }
        },
        created(){
            getDept().then((res)=>{
                let {code,data} = res.data;
                if(code == 200){
                    this.depts = data.list;
                }
            }).catch(err => err),
            getRole().then((res)=>{
                let {code,data} = res.data;
                if(code == 200){
                    this.roles = data.list;
                }
            }).catch(err => err)
        },
        methods:{
            goBack(){
                this.$router.go(-1);
            },
            async onSubmit(New){
                // 1.判断账号是否已经存在
                var res = await userPage({
                    pno:1,
                    psize:30,
                    username:this.newUser.username,
                }).catch(err => err);
                var { code,data,msg } = res.data;

                //验证通过
               // 
                if( code == 200 && data.list.length == 0){
                    // 2.判断表单验证是否通过
                var valid = await this.$refs[New].validate().catch((_) => false);
                   if(valid){
                    // 3.验证通过 将更新的数据传递给后台
                    var ress = await insertUser(this.newUser).catch(err => err);
                    var {code,msg} = ress.data;
                    //4.给出提示消息 新增成功后跳转
                    this.$message({
                        message:msg,
                        type:code==200?'success':'error'
                    })
                    if(code == 200){
                        this.$router.back();
                    }
                   }
                }

            }
        },
    }
</script>

<style scoped>

</style>