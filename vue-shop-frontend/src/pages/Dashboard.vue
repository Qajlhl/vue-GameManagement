<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card shadow="hover" class="mgb20" style="height: 252px">
                    <div class="user-info">
                        <img :src="userInfo.face || '../assets/img/img.jpg'" class="user-avator" alt />
                        <div class="user-info-cont">
                            <div class="user-info-name">{{ userInfo.username }}</div>
                            <div>{{ userInfo.nickname }}</div>
                        </div>
                    </div>
                    <div class="user-info-list">
                        上次登录时间：
                        <span>2022-07-22</span>
                    </div>
                    <div class="user-info-list">
                        上次登录地点：
                        <span>哈尔滨</span>
                    </div>
                </el-card>
                <el-card shadow="hover" style="height: 252px">
                    <div slot="header" class="clearfix">
                        <span>语言详情</span>
                    </div>
                    Vue <el-progress :percentage="71.3" color="#42b983"></el-progress>JavaScript
                    <el-progress :percentage="24.1" color="#f1e05a"></el-progress>CSS <el-progress :percentage="13.7">
                    </el-progress>HTML
                    <el-progress :percentage="5.9" color="#f56c6c"></el-progress>
                </el-card>
            </el-col>
            <el-col :span="16">
                <el-row :gutter="20" class="mgb20">
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{ padding: '0px'}">
                            <div class="grid-content grid-con-1">
                                <i class="el-icon-lx-people grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">1234</div>
                                    <div>用户访问量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-2">
                                <i class="el-icon-lx-notice grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">321</div>
                                    <div>系统消息</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-3">
                                <i class="el-icon-lx-goods grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">5000</div>
                                    <div>数量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-card shadow="hover" style="min-height: 400px">
                    <div slot="header" class="clearfix">
                        <span>待办事项</span>
                        <el-button style="float: right; padding: 3px 0" type="text" @click="ShowVisble()">添加</el-button>
                    </div>

                    <!-- 修改后的清单 -->
                    <div v-for="(obj) in todoListName" :key="obj.id">
                        <el-row :gutter="4">
                            <el-col :span="2">
                                <el-checkbox v-model="obj.status"></el-checkbox>
                            </el-col>
                            <el-col :span="18"><span :class="{todoitemdel : obj.status}">{{obj.title}}</span></el-col>
                            <el-col :span="4" :style="{textAlign:'right'}">
                                <el-button icon="el-icon-edit" type="warning" size="mini" circle
                                    @click="ShowVisble(obj.id)"></el-button>

                                <el-button icon="el-icon-delete" type="danger" size="mini" circle
                                    @click="Bdelte(obj.id)"></el-button>
                            </el-col>
                        </el-row>
                        <el-divider></el-divider>
                    </div>

                </el-card>
            </el-col>
        </el-row>
        <el-dialog :visible.sync="dialog.visible" width="30%" :title="dialog.headtitle">
            <el-input placeholder="请输入代办事项" v-model="dialog.title"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialog.visible= false">取 消</el-button>
                <el-button type="success" @click="Save">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import Schart from 'vue-schart';
import { mapState } from "vuex";
export default {
    name: 'dashboard',
    data() {
        return {
            name: localStorage.getItem('ms_username'),
            data: [
                {
                    name: '2018/09/04',
                    value: 1083
                },
                {
                    name: '2018/09/05',
                    value: 941
                },
                {
                    name: '2018/09/06',
                    value: 1139
                },
                {
                    name: '2018/09/07',
                    value: 816
                },
                {
                    name: '2018/09/08',
                    value: 327
                },
                {
                    name: '2018/09/09',
                    value: 228
                },
                {
                    name: '2018/09/10',
                    value: 1065
                }
            ],
            options: {
                type: 'bar',
                title: {
                    text: '最近一周各品类销售图'
                },
                xRorate: 25,
                labels: ['周一', '周二', '周三', '周四', '周五'],
                datasets: [
                    {
                        label: '家电',
                        data: [234, 278, 270, 190, 230]
                    },
                    {
                        label: '百货',
                        data: [164, 178, 190, 135, 160]
                    },
                    {
                        label: '食品',
                        data: [144, 198, 150, 235, 120]
                    }
                ]
            },
            options2: {
                type: 'line',
                title: {
                    text: '最近几个月各品类销售趋势图'
                },
                labels: ['6月', '7月', '8月', '9月', '10月'],
                datasets: [
                    {
                        label: '家电',
                        data: [234, 278, 270, 190, 230]
                    },
                    {
                        label: '百货',
                        data: [164, 178, 150, 135, 160]
                    },
                    {
                        label: '食品',
                        data: [74, 118, 200, 235, 90]
                    }
                ]
            }
            ,dialog:{
                title:'',
                headtitle:'',
                visible:false,
                todoId:undefined
            },
       };
    },
    components: {
        Schart
    },
    computed: {
        role() {
            return this.name === 'admin' ? '超级管理员' : '普通用户';
        },
        ...mapState(['userInfo']),
        //第一个参数：modules属性名，
        //第二个参数：想要获取到modules中state的参数名（想要使用谁就写谁的参数名）
        ...mapState('todoList',['todoListName']),
    },
    // created() {
    //     this.handleListener();
    //     this.changeDate();
    // },
    // activated() {
    //     this.handleListener();
    // },
    // deactivated() {
    //     window.removeEventListener('resize', this.renderChart);
    //     bus.$off('collapse', this.handleBus);
    // },
    methods: {
        ShowVisble(todoId){
            if(todoId == undefined){
                this.dialog.headtitle = "新增代办事项";
                this.dialog.title = '';
                this.dialog.todoId = undefined;
            }else{
                this.dialog.headtitle = "编辑代办事项";
                this.dialog.todoId = todoId;
                const todo = this.todoListName.find((p) => p.id == todoId);
                this.dialog.title = todo.title;
            }
            this.dialog.visible=true;
        },
        changeDate() {
            const now = new Date().getTime();
            this.data.forEach((item, index) => {
                const date = new Date(now - (6 - index) * 86400000);
                item.name = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
            });
        },
        Save() {
           this.dialog.visible = false;
           let dtitle = this.dialog.title;
           dtitle = dtitle.trim();
           if(!dtitle){
            this.$message.error('请输入正确的格式');
            return;
           }

           
           if(this.dialog.todoId == undefined){
             this.$store.commit('todoList/AddNeww',this.dialog.title);
           }else{
            this.$store.commit('todoList/EditNeww',{id:this.dialog.todoId,title:this.dialog.title});
            this.dialog.todoId = undefined;
           }
           this.dialog.title = '';
        },
        async Bdelte(todoId){
            let confirm = await this.$confirm('是否确定删除该任务？','提示',{
                confirmButtonText:'确 定',
                cancelButtonText:'取 消',
                type : 'waring',
            }).catch(()=>{
                this.$message({
                    type:'info',
                    message:'成功取消'
                })
            });
            if(confirm == 'confirm'){
                this.$store.commit('todoList/Bdelte',todoId);
            }            
        },
        editNew(){
            let newinfo = prompt("请输入修改内容");
            this.$store.commit('todoList/Bchange',[index,newinfo]);
        }
        // handleListener() {
        //     bus.$on('collapse', this.handleBus);
        //     // 调用renderChart方法对图表进行重新渲染
        //     window.addEventListener('resize', this.renderChart);
        // },
        // handleBus(msg) {
        //     setTimeout(() => {
        //         this.renderChart();
        //     }, 200);
        // },
        // renderChart() {
        //     this.$refs.bar.renderChart();
        //     this.$refs.line.renderChart();
        // }
    }
};
</script>

<style scoped>
.el-divider{
    margin: 20px 0;
}
.el-row {
    margin-bottom: 20px;
}

.grid-content {
    display: flex;
    align-items: center;
    height: 100px;
}

.grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
}

.grid-num {
    font-size: 30px;
    font-weight: bold;
}

.grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}

.grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
}

.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
}

.user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
}

.user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
}

.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
}

.user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
}

.user-info-list span {
    margin-left: 70px;
}

.mgb20 {
    margin-bottom: 20px;
}

.todo-item {
    font-size: 14px;
}

.todoitemdel {
    text-decoration: line-through;
    color: #999;
}

.schart {
    width: 100%;
    height: 300px;
}
</style>
