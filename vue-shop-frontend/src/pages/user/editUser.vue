<template>
    <div>
        <el-page-header @back="goBack" content="编辑用户信息"></el-page-header>
        <el-form :model="newUser" :rules="rules" ref="form" label-width="80px" :style="{marginTop:'10px'}">
             <el-form-item label="账号" prop="username">
                <el-input v-model="newUser.username" readonly></el-input>
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
    import { getDept, getRole,updateUser,findUser } from '../../api/index'
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
                    id:undefined,
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
        watch:{
            $route(neww){
                //在触发监听事件后，当前route改变，需要将用户信息进行更新，否则系统将会继续使用上次的用户信息作为本次的用户信息
               this.fun(neww.query.id);
            }
        },
        created(){
            //当未触发监听事件时，需要另外获取用户信息
            this.fun(this.$route.query.id);
        },
        methods:{
            goBack(){
                this.$router.go(-1);
            },
            async onSubmit(New){
                let valid = await this.$refs[New].validate().catch(err => err);
                if(valid){
                    delete this.newUser.checkpass;
                    let res = await updateUser(this.newUser).catch(err => err);
                    let {code,msg} = res.data;
                    if( code == 200){
                        this.$message.success(msg);
                        this.$router.back();
                    }else{
                        this.$message.warning(msg);
                    }
                }else{
                    return;
                }
            },
            fun(newid){
                getDept().then((res) => {
                    let { code, data } = res.data;
                    if (code == 200) {
                        this.depts = data.list;
                    }
                }).catch(err => err),


                    getRole().then((res) => {
                        let { code, data } = res.data;
                        if (code == 200) {
                            this.roles = data.list;
                        }
                    }).catch(err => err),

                this.newUser.id = newid;
                findUser(this.newUser.id).then((res) => {
                    let { code, data } = res.data;
                    if (code == 200) {
                        data.checkpass = data.password;
                        this.newUser = data;

                    }
                }).catch(err => err);
            }
        },
    }
</script>

<style scoped>

</style>