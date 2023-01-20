import Vue from 'vue'
import Vuex from 'vuex'
import todoListModules from '../store/modules/todoList'
Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        userInfo:JSON.parse(sessionStorage.getItem('userInfo')),
    },
    modules:{
        todoList:todoListModules,
    },
    mutations:{
        newUser(state,user){
            state.userInfo = user;
        }
    }
    
}) 

export default store