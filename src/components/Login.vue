<template>
    <div class='login_container'>
        <div class="login_box">
            <div class="avatar_box">
                <img class="icon" src="../assets/ricky.jpeg" alt="">
            </div>
            <!-- 用model绑定数据源 -->
            <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">
                <el-form-item prop="username">
                  <el-input v-model="loginForm.username" prefix-icon="el-icon-user"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="loginForm.password" prefix-icon="el-icon-lock" type="password"></el-input>
                </el-form-item>
                <el-form-item class='btns'>
                    <el-button type="primary" @click="login">login</el-button>
                    <el-button type="info" @click="resetLoginForm">reset</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                loginForm: {
                    username: 'admin',
                    password: '123456'
                },
                loginFormRules: {
                    username: [
                        {required: true, message: "please input the activity", trigger: "blur"},
                        {min: 5, max: 10, message: "the length from 3 to 5", trigger: "blur"}
                    ],
                    password: [
                        {required: true, message: "please input the password", trigger: "blur"},
                        {min: 6, max: 15, message: "the length from 6 to 5", trigger: "blur"}
                    ]
                }

            }

        },
        methods: {
                resetLoginForm() {
                    this.$refs.loginFormRef.resetFields();
                },
                login () {
                    // 用于验证，如果验证通过就发出请求
                    this.$refs.loginFormRef.validate(valid => {
                        // 如果为false，直接返回，不再继续
                        if (!valid) return;
                        // 这里面的this指向实例
                        this.$http.post('login',this.loginForm).then(res=>{
                            // console.log(res.data)
                            if (res.data.meta.status !== 200) console.log('登录失败')
                            // console.log('登陆成功')
                            // 在sessionStorage里面加上token值
                            window.sessionStorage.setItem("token",res.data.data.token);
                            // 实现页面跳转
                            this.$router.push("/home");
                        })
                    })
                }
        }
    };
</script>

<style lang='less' scoped> 
.login_container {
    background-color: orange;
    height: 100%
}

.login_box {
    width: 450px;
    height: 300px;
    background-color: bisque;
    border-radius: 2px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform : translate(-50%,-50%);

    .avatar_box {
        position: absolute;
        height: 130px;
        width: 130px;
        background-color: red;
        left: 50%;
        transform : translate(-50%,-50%);
        padding: 10px;
        border-radius: 50%;
        box-shadow: 0 0 10px #ddd;
        img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
        }
    }
    .login_form {
        position: absolute;
        bottom: 0;
        left: 10px;
        right: 10px;
    }
    
    .btns {
        display:flex;
        justify-content: flex-end;

    }
}

</style>
