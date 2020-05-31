<template>
    <div>
        <!-- 面包屑标题 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片内容 -->
        <el-card>
            <!-- 通过gutter去改变每列之间的距离 -->
            <!-- 栅格布局 -->
            <el-row :gutter="20">
                <!-- 通过span来改变宽度 -->
                <el-col :span="8">
                    <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getUserList">
                        <el-button @click="getUserList" slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
                </el-col>
            </el-row>
            <!-- 用户列表区域 -->
            <!-- 用data绑定数据源 -->
            <el-table :data="userlist" border stripe>
                <!-- prop数据源，填写uers中的字段名 -->
                <el-table-column label="no" type="index"></el-table-column>
                <el-table-column label="name" prop="username"></el-table-column>
                <el-table-column label="e-mail" prop="email"></el-table-column>
                <el-table-column label="phone" prop="mobile"></el-table-column>
                <el-table-column label="role" prop="role_name"></el-table-column>
                <el-table-column label="status">
                    <template v-slot="scope">
                        <!-- v-model直接绑定数据 -->
                        <el-switch v-model="scope.row.mg_state" @change="userStateChanged(scope.row)"
                            active-color="#13ce66" inactive-color="#ff4949">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="operate">
                    <!-- type用于修改样式 -->
                    <el-button type="primary" icon="el-icon-edit"></el-button>
                    <el-button type="danger" icon="el-icon-delete"></el-button>
                    <el-tooltip effect="dark" content="share" placement="share">
                        <el-button type="warning" icon="el-icon-setting"></el-button>
                    </el-tooltip>
                </el-table-column>
            </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="queryInfo.pagenum" :page-sizes="[1, 2, 5, 10]" :page-size="queryInfo.pagesize"
                layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </el-card>

        <el-dialog title="add useres" :visible.sync="addDialogVisible" width="30%" @close="addDialogClosed">
            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="90px">
                <el-form-item label="name" prop="username">
                    <el-input v-model="addForm.username"></el-input>
                </el-form-item>
                <el-form-item label="password" prop="password">
                    <el-input v-model="addForm.password"></el-input>
                </el-form-item>
                <el-form-item label="email" prop="email">
                    <el-input v-model="addForm.email"></el-input>
                </el-form-item>
                <el-form-item label="mobile" prop="mobile">
                    <el-input v-model="addForm.mobile"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addUsers">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                queryInfo: {
                    query: '',
                    // 当前的页数
                    pagenum: 1,
                    pagesize: 2
                },
                userlist: [],
                total: 0,
                addDialogVisible: false,
                addForm:{
                    username:'',
                    password:'',
                    email:'',
                    mobile:''
                },
                addFormRules:{
                    username: [{required: true, message:'please input name', trigger: 'blur' },
                    {min : 3, max: 10, message: '用户长度在3到10'}
                    ],
                    password:[{required: true, message:'please input password', trigger: 'blur' },
                    {min : 6, max: 15, message: '密码长度在3到10'}],
                    email:[{required: true, message:'please input email', trigger: 'blur' },
                    {min : 6, max: 15, message: '邮箱长度在3到10'}],
                    mobile:[{required: true, message:'please input mobile', trigger: 'blur' },
                    {min : 6, max: 15, message: '电话长度在3到10'}],

                }
            }
        },
        created() {
            this.getUserList()
        },
        methods: {
            async getUserList() {
                const { data: res } = await this.$http.get('users', { params: this.queryInfo })
                console.log("=======")
                console.log(res)
                // return直接阻断后面步骤
                if (res.meta.status !== 200) return this.$message.error("获取消息失败")
                this.userlist = res.data.users
                this.total = res.data.total
            },
            handleSizeChange(newSize) {
                console.log(newSize);
                this.queryInfo.pagesize = newSize
                this.getUserList()
            },
            handleCurrentChange(newPage) {
                console.log(newPage);
                this.queryInfo.pagenum = newPage
                this.getUserList()
            },
            async userStateChanged(userinfo) {
                // console.log(userinfo)
                const { data: res } = await this.$http.put(`users/${userinfo.id}/state/${userinfo.mg_state}`)
                if (res.meta.status !== 200) {
                    userinfo.mg_state = !userinfo.mg_state
                    return this.$message.error('更新用户状态失败')
                }
                this.$message.success('更新用户状态成功')
            },
            addDialogClosed(){
                this.$refs.addFormRef.resetFields()
            },
            addUsers(){
                this.$refs.addFormRef.validate((valid)=>{
                    if(!valid) return
                    // params: this.addForm
                    this.$http.post('users',this.addForm).then((res)=>{
                        console.log(res);
                       
                    })
                })
            }
        }
    }
</script>