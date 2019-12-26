import modelEnhance from '@/utils/modelEnhance';
import PageHelper from '@/utils/pageHelper';
/**
 * 当第一次加载完页面时为true
 * 可以用这个值阻止切换页面时
 * 多次初始化数据
 */
let LOADED = false;
export default modelEnhance({
  namespace: 'articleDetail',

  state: {
    articlelist: []
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname, search }) => {
        if (pathname === '/articleDetail' && !LOADED) {
         // LOADED = true;
          var reg = new RegExp("(^|&)id=([^&]*)(&|$)");
          var r = search.substr(1).match(reg);
          console.log(unescape(r[2]))
          dispatch({
            type: 'init',
            payload: unescape(r[2])
          });
        }
      });
    }
  },

  effects: {
    // 进入页面加载
    *init({ payload }, { call, put, select }) {
     
      yield put({
          type: 'article',
          payload:payload
        })
    },
    *article({ payload }, { call, put }) {
      yield put({
        type: '@request',
        payload: {
          method: 'GET',
          valueField: 'articlelist',
          url: `/article/articleDetail/${payload}`
        }
      })
    }
  },
  reducers: {}
});
