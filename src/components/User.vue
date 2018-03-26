<template>
	<div>
		<div>User</div>
		<router-view />
		<router-link to="/home">home</router-link>
		<div>以下为功能按钮权限</div>
		<div>
			<button v-permission="['user:add']" onclick="javascript:alert('增加成功')">增加用户</button>
			<button v-permission="['user:delete']" onclick="javascript:alert('删除成功')">删除用户</button>	
		</div>
	</div>
</template>

<script>
</script>

<style>
</style>