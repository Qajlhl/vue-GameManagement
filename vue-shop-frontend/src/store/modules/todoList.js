export default{
    namespaced:true,
    state:{
        todoListName: [
            {
                id : 1,
                title: '今天要修复100个bug',
                status: true
            },
            {
                id : 2,
                title: '今天要修复100个bug',
                status: false
            },
            {
                id : 3,
                title: '今天要写100行代码加几个bug吧',
                status: true
            },
        ],
        newtitle:'',
        age:18,
    },
    mutations:{
        AddNeww(state,payload){
            state.todoListName.push({id: Date.now(), title : payload , status : false});
        },
        Bdelte(state,payload){
            state.todoListName.splice(payload,1);
        },
        EditNeww(state,newtodo){
            const todo = state.todoListName.find((p) => p.id == newtodo.id);
            todo.title = newtodo.title;
        }
    }
}