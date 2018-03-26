import User from '@/components/User'
import UserAdd from '@/components/UserAdd'
import UserDelete from '@/components/UserDelete'
import home from '@/components/home'

var asyncRouter = [
    {
        path: '/home',
        name: '首页',
        component: home,
        meta:{permission:[]}
    },
    {
    	path: '/user',
        name: '用户管理',
        component: User,
        children: [
            {
            	path: '/user/add',
                name: '用户添加页面',
                component: UserAdd,
                meta:{permission:['user:add']},
                children: [
                	{
                		path: '/user/add/1',
		                name: '用户添加页面1',
//		                component: require('../components/UserAdd1'),
		                meta:{permission:['user:add:1']}	
                	},
                	{
                		path: '/user/add/2',
		                name: '用户添加页面2',
//		                component: require('../components/UserAdd2'),
		                meta:{permission:['user:add:2']}
                	}
                ]
            },
            {
            	path: '/user/delete',
                name: '用户删除页面',
                component: UserDelete,
                meta:{permission:['user:delete']}
            },
            {
            	path: '/user/update',
                name: '用户更新页面',
//              component: require('../components/UserUpdate'),
                meta:{permission:['user:update']}
            }
            
        ]
    }
]

export default asyncRouter;