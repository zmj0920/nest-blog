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

  },

  subscriptions: {
    setup({ dispatch, history }) {

      history.listen((location) => {
        console.log(location)
      })
      history.listen(({ pathname, search }) => {
        if (pathname === '/articleDetail' && !LOADED) {
          LOADED = true;
          dispatch({
            type: 'init',
            payload: search
          });
        }
      });
    }
  },

  effects: {
    // 进入页面加载
    *init({ payload }, { call, put, select }) {
      console.log(payload)
    }

  },
  reducers: {}
});
