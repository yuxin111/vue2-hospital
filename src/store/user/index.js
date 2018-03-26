import * as myUtil from '@/utils/myUtil'

const state = {
	// 用户id
	id:'',
	
	// 用户姓名
	name:'',
	
	// 用户权限
	permission : myUtil.getStore('permission') || [],
}

const getters = {
	getPermission: state => {
		return state.permission
	}
}

const mutations = {
	setID: (state, data) => {
        state.id = data
    },
    setName: (state, data) => {
        state.name = data
    }
}

const actions = {
	// 实际登陆操作
	loginAction({commit},ruleForm){
		return new Promise((resolve,reject) => {
			console.log("登陆请求的用户名是:"+ruleForm.username+",密码是"+ruleForm.ps);
			
			// ajax请求过后
			var permissions = ['user:add:2','user:delete','user:update'];
			var id = '12345';
			var name = 'yuxin';
			
			// 向store中设置属性
			myUtil.setStore('permission',permissions);
			console.log("登陆后获取的用户权限:"+permissions);
			commit('setID', id);
			console.log("登陆后获取的用户id:"+id);
            commit('setName', name);
            console.log("登陆后获取的用户姓名:"+name);
            
            // 将permissions抛出
            resolve(permissions);
		})
	}
}

export default {
	namespaced: true,
    state,
    getters,
    mutations,
    actions
}