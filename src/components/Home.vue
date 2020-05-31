<template>
    <el-container class="home-container">
        <el-header>
            <div>
                <img style="width: 2px;" src="../assets/logo.png" alt="">
                <div>System</div>
            </div>
            <el-button type="info" @click="logout">quit</el-button>
        </el-header>
        <el-container>
            <el-aside width="200px">
                <!-- 设置一个数的时候既可以:router="true"，也可以router 启动之后点击将跳转到 index下面的路径下 -->
                <!-- unique-opened用来解决如果唯一打开导航菜单功能 -->
                <el-menu background-color="#333744" text-color="#fff" active-text-color="#409EFF" unique-opened router :default-active="$route.path"> 
                    <!-- 如果要动态绑定就在后面加绑定 -->
                    <!-- 通过绑定index不同的对象实现不同的路由 -->
                    <el-submenu :index="item.path" v-for="item in menulist" :key="item.id">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>{{item.authName}}</span>
                        </template>
                        <!-- 二级菜单 -->
                        <el-menu-item :index="'/'+ subItem.path" v-for="subItem in item.children" :key="subItem.id" @click="saveState('/'+ subItem.path)">
                            <template slot="title">
                                <!-- 图标的样式 -->
                                <i class="el-icon-goods"></i>
                                <span>{{subItem.authName}}</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>    
                </el-menu>
            </el-aside>
            <el-main><router-view></router-view></el-main>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        created(){
            this.getMenuList()
        },
        data (){
            return {
                menulist:[],
                ex:{
                    "101":"alfred",
                    "102":"Olivia"
                }
            }
        },
        methods: {
            logout() {
                window.sessionStorage.clear();
                this.$router.push('/login');
            },
            getMenuList() {
                    this.$http.get('menus').then(res=>{
                        console.log(res.data)
                        if (res.data.meta.status !== 200) return this.$message.error(res.meta.msg)
                        this.menulist = res.data.data
                        // 打印左侧表格里面的内容
                        // console.log(this.menulist)
                    }
                )
            },
            
        }
    };
</script>

<style lang='less' scoped>
    .home-container {
        height: 100%;
    }

    .el-header {
        background-color: #373d41;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #fff;
        font-size: 20px;

        >div {
            display: flex;
            align-items: center;
        }
    }

    .el-aside {
        background-color: #333744;
        .el-menu {
            border-right: none;
        }
    }

    .el-main {
        background-color: #EAEDF1;
    }
</style>