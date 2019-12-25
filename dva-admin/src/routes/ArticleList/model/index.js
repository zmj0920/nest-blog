import modelEnhance from '@/utils/modelEnhance';
import PageHelper from '@/utils/pageHelper';
import { articleType } from '../service';
/**
 * 当第一次加载完页面时为true
 * 可以用这个值阻止切换页面时
 * 多次初始化数据
 */
let LOADED = false;
export default modelEnhance({
  namespace: 'articleList',
  state: {
    pageData: PageHelper.create(),
    article_type: []
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/articleList' && !LOADED) {
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
    *init({ payload }, { call, put, select }) {
      const { pageData } = yield select(state => state.articleList);
      yield put({
        type: 'getPageList',
        payload: {
          pageData: pageData
        }
      });
      yield put({
        type: "article_typeList"
      })
    },
    // 获取分页数据
    *getPageList({ payload }, { call, put }) {
      const { pageData } = payload;
      yield put({
        type: '@request',
        payload: {
          method: 'GET',
          valueField: 'pageData',
          url: `article/findLimitAll/${pageData.pageNum}/${pageData.pageSize}`,
          pageInfo: pageData
        }
      })
    },
    // 保存 之后查询分页
    *save({ payload }, { call, put, select, take }) {

    },
    // 修改
    *update({ payload }, { call, put, select }) {

    },
    // 删除 之后查询分页
    *remove({ payload }, { call, put, select }) {

    },
    *article_typeList({ payload }, { call, put }) {
      const data = yield call(articleType, payload)
      yield put({
        type: 'articleTypeHandle',
        payload: data
      })
    }
  },
  reducers: {
    articleTypeHandle(state, { payload }) {
      return {
        ...state,
        article_type: payload
      }
    }
  }
});
