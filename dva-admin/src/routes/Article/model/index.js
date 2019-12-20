import modelEnhance from '@/utils/modelEnhance';
import { articleType } from '../service';
/**
 * 当第一次加载完页面时为true
 * 可以用这个值阻止切换页面时
 * 多次初始化数据
 */
let LOADED = false;
export default modelEnhance({
  namespace: 'article',
  state: {
    article_type: []
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/article' && !LOADED) {
          LOADED = true;
          dispatch({
            type: 'init'
          });
        }
      });
    }
  },
  effects: {
    // 进入页面加载
    *init({ payload }, { put }) {
      yield put({
        type: 'articleTypeList'
      });
    },
    // 添加文章
    *save({ payload }, { call, put, select, take }) {
      const { article, success } = payload;
      // put是非阻塞的 put.resolve是阻塞型的
      yield put({
        type: '@request',
        payload: {
          notice: true,
          url: '/article/create',
          data: article
        }
      });
      success()
    },
    // 文章类型列表
    *articleTypeList({ payload }, { call, put }) {
      const data = yield call(articleType, payload);
      yield put({
        type: 'articleTypeHandle',
        payload: data,
      });
    }
  },
  reducers: {
    articleTypeHandle(state, { payload }) {
      return {
        ...state,
        article_type: payload,
      };
    },
  }
});
