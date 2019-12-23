export default [
    {
        name: '仪表盘',
        icon: 'dashboard',
        path: '/dashboard',
    },
    {
        name: '文章列表',
        icon: 'desktop',
        path: '/article',
        children: [
            {
                name: '添加文章',
                path: '/article',
            },
            {
                name: '文章列表',
                path: '/articleList',
            }
        ]
    },
    // {
    //     name: '组件',
    //     icon: 'desktop',
    //     path: '/component',
    //     children: [
    //         {
    //             name: '工具条',
    //             path: '/toolbar',
    //         },
    //         {
    //             name: 'ECharts',
    //             path: '/charts/ec',
    //         },
    //         {
    //             name: 'G2',
    //             path: '/charts/g2',
    //         }, {
    //             name: '富文本',
    //             path: '/editor',
    //         },
    //         {
    //             name: 'BaseComponent',
    //             path: '/baseComponent',
    //         },
    //         {
    //             name: '画廊',
    //             path: '/gallery',
    //         },
    //         {
    //             name: '搜索条',
    //             path: '/searchBar',
    //         },
    //         {
    //             name: '穿梭树',
    //             path: '/transferTree',
    //         },
    //         {
    //             name: '打印',
    //             path: '/print',
    //         },
    //         {
    //             name: '按钮+消息+遮罩',
    //             path: '/button',
    //         },
    //         {
    //             name: '动画',
    //             path: '/animations',
    //         },
    //         {
    //             name: '图标',
    //             path: '/icons',
    //         },
    //         {
    //             name: '表单',
    //             path: '/form',
    //         },

    //     ],
    // },
    // {
    //     name: '页面',
    //     icon: 'book',
    //     path: '/page',
    //     children: [
    //         {
    //             name: '锁屏',
    //             path: '/lock',
    //         },

    //         {
    //             name: '表格数据',
    //             path: '/blank',
    //         },
    //         {
    //             name: '结果页',
    //             path: '/result',
    //         },
    //         {
    //             name: 'Coming Soon',
    //             path: '/coming',
    //         },
    //         {
    //             name: '403',
    //             path: '/403',
    //         },
    //         {
    //             name: '404',
    //             path: '/404',
    //         },
    //         {
    //             name: '500',
    //             path: '/500',
    //         },
    //         {
    //             name: '多级路由',
    //             path: '/level-route/:sub?',
    //         },
    //         {
    //             name: 'CRUD',
    //             path: '/crud/:detail?',
    //         },

    //     ]
    // }
]
