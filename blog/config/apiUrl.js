let ipUrl = 'https://nest.521em.cn'

let servicePath = {
    getArticleLimit: ipUrl + '/article/findLimit/',  //  首页文章列表接口
    getArticleById: ipUrl + '/article/articleDetail/',  // 文章详细页内容接口 ,需要接收参数
    getTypeInfo: ipUrl + '/articletype/find',         // 文章分类信息
    getListById: ipUrl + '/article/findTypeOne/',         //根据类别ID获得文章列表  
    getAdvertList: ipUrl + '/advert/find',         //广告列表

}
export default servicePath;