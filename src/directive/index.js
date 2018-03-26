const permission = {
    // eslint-disable-next-line
    install (Vue, options){
        Vue.directive('permission', {
            inserted(el, binding, vnode){
                let curPermission = binding.value;
                let permissionList = vnode.context.$store.state.user.permission;
				for(var i in permissionList){
					if(permissionList[i] == curPermission) return;
				}
				el.parentNode.removeChild(el);
            }
        })
    }
}

export default permission
