<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">后台管理系统</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="param.username" placeholder="请输入用户名...." prefix-icon="el-icon-lx-people"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="请输入密码...." v-model="param.password" prefix-icon="el-icon-lx-lock" show-password   @keyup.enter.native="submitForm()"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </div>
                <p class="login-tips">Tips : 用户名和密码随便填。</p>
            </el-form>
        </div>
    </div>
</template>

<script>
import { login } from '../api/index';
export default {
    data: function () {
        return {
            param: {
                username: 'admin',
                password: '123123'
            },
            rules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' },
                {min:6,max:16,message:'密码长度在6-16位之间',trigger:'blur'}
                ]
            }
        };
    },
    methods: {
        async submitForm() {
            //通过validate方法验证表单数据是否正确
            let valid = await this.$refs.login.validate().catch((err) => console.log(err));
            if(valid){
                let res = await login(this.param);
                let {code,data,msg} = res.data;
                if(code == 200){
                    this.$message.success(msg);
                    sessionStorage.setItem('token',data.token);
                    sessionStorage.setItem('userInfo',JSON.stringify(data.userInfo));
                    this.$store.commit('newUser',data.userInfo);
                    //登陆成功 页面让跳转至主页
                    this.$router.push('/');
                }
            }
        } 
            
        //     // this.$refs.login.validate((valid) => {
        //     //     if (valid) {
        //     //         this.$message.success('登录成功');
        //     //         localStorage.setItem('ms_username', this.param.username);
        //     //         this.$router.push('/');
        //     //     } else {
        //     //         this.$message.error('请输入账号和密码');
        //     //         console.log('error submit!!');
        //     //         return false;
        //     //     }
        //     // });
        // }
    }
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../assets/img/login-bg.jpg);
    background-size: 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
</style>
