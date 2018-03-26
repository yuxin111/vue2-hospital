import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'

Vue.use(Router)

const routes = [
	{
		path: '/',
		name: '登录',
		component: Login
	},
]
export default new Router({
	mode: 'history',
  	routes
})

