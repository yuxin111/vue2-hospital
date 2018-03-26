<template>
	<div class="login-template">
		<el-form ref="ruleForm" class="login-form" :model="ruleForm" :rules="rules">
			
			<el-form-item prop="username">
				<el-input
			    	placeholder="请输入用户名"
			    	suffix-icon="el-icon-tickets"
			    	v-model="ruleForm.username"
		    	/>				
			</el-form-item>
			
			<el-form-item prop="ps">
				<el-input
			    	placeholder="请输入密码"
			    	type="password"
			    	suffix-icon="el-icon-info"
			    	v-model="ruleForm.ps"
		    	/>
			</el-form-item>
			
			<el-form-item>
				<el-button 
					type="primary"
					class="login-go"
					@click="submitForm('ruleForm')"
				>登陆
				</el-button>
			</el-form-item>
			
			<div class="login-bottom">
				<el-checkbox>记住我</el-checkbox>
				<a class="login-register">注册</a>
			</div>
		</el-form>
	</div>
</template>

<script>
import asyncRouter from '@/router/asyncRouter'
import layout from '@/components/layout/layout'
import router from '@/router'
import notfound from '@/components/404'
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
	data() {
		return {
			ruleForm: {
				username: '',
				ps: '',
			},
			rules: {
				username: [{
					required: true,
					message: '请输入用户名',
					trigger: 'blur'
				}],
				ps: [{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					},
					{
						min: 6,
						message: '密码长度最少为6位',
						trigger: 'blur'
					}
				]
			}
		}
	},
	methods: {
        ...mapActions({
            loginAction: 'user/loginAction'
        }),
		submitForm(formName) {
			let vm = this;
			vm.$refs[formName].validate((valid) => {
				if(valid) {
					vm.login();
				} else {
					return false;
				}
			});
		},
		login() {
			let vm = this;
			let ruleForm = vm.ruleForm;
			vm.loginAction(ruleForm)
				.then(res => {
					return vm.routerMatch(res, asyncRouter);
				})
				.then(res => {
					// 将当前用户拥有的权限路由添加进总路由中
					var rootRouter = [
						{
							path: '/layout',
							name: '边框',
							component: layout,
							children: []
						},
						{
							path: '*',
							component: notfound
						}
					]
					rootRouter[0].children = res;
					router.addRoutes(rootRouter);
					vm.$router.push('/home');
				})
		},
		routerMatch(permissions, asyncRouter) {
			let vm = this;
			return new Promise((resolve) => {
				let asyRouter = asyncRouter.slice();
				function createRouter(parent, asyRouter) {
					asyRouter.forEach((item) => {
						if(item.children && item.children.length) {
							createRouter(item, item.children);
						} else {
							var routePermissions = item.meta.permission;
							var isPermit = true
							routePermissions.forEach((it) => {
								if(permissions.indexOf(it) == -1) {
									isPermit = false;
									return;
								}
							});
							if(!isPermit && parent != null) {
								vm.removeObjWithArr(parent.children,item);
								createRouter(parent,parent.children);
							}
						}
					})
				}
				createRouter(null, asyRouter);
				console.log("处理后的路由:"+asyRouter);
				resolve(asyRouter);
			})
		},
		removeObjWithArr(arr,obj){
			var length = arr.length;
			for(var i = 0; i < length; i++){
				if(arr[i] == obj){
					arr.splice(i,1);
				}
			}
			return arr;
		}

	}
}</script>

<style scoped="scoped">
	*{
		font-size: 14px;
	}
	.login-template{
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: #e4e5e6;
	}
	.login-form{
		width: 325px;
		/*height: 325px;*/
		padding: 30px;
		position: relative;
		background-color: #FFF;
	}
	.login-go{
		width: 100%;
	}
	.login-bottom{
		display: flex;
		justify-content: space-between;
	}
	.login-register{
		color: #409EFF;
	}
	.login-register:hover{
		color: #409EFF;
		cursor: pointer;
	}
</style>