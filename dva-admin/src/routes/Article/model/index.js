import modelEnhance from '@/utils/modelEnhance';
import PageHelper from '@/utils/pageHelper';
/**
 * 当第一次加载完页面时为true
 * 可以用这个值阻止切换页面时
 * 多次初始化数据
 */
let LOADED = false;
export default modelEnhance({
  namespace: 'article',
  state: {
    pageData: PageHelper.create(),
    employees: []
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
    *init({ payload }, { call, put, select }) {
      const { pageData } = yield select(state => state.crud);
      yield put({
        type: 'getPageInfo',
        payload: {
          pageData: pageData
        }
      });
      yield put({
        type: 'getEmployees'
      });
    },
    // 获取分页数据
    *getPageInfo({ payload }, { call, put }) {
      const { pageData } = payload;
      yield put({
        type: '@request',
        payload: {
          method: 'GET',
          valueField: 'pageData',
          url: '/user',
          pageInfo: pageData
        }
      });
    },
    // 保存 之后查询分页
    *save({ payload }, { call, put, select, take }) {
      const { values, success } = payload;
      const { pageData } = yield select(state => state.crud);
      // put是非阻塞的 put.resolve是阻塞型的
      yield put.resolve({
        type: '@request',
        payload: {
          notice: true,
          url: '/adduser',
          data: values
        }
      });
      yield put({
        type: 'getPageInfo',
        payload: { pageData }
      });
      success();
    },
    // 修改
    *update({ payload }, { call, put ,select}) {
      const { record,values, success } = payload;
      console.log(record.uid)
      const { pageData } = yield select(state => state.crud);
      // put是非阻塞的 put.resolve是阻塞型的
      yield put.resolve({
        type: '@request',
        payload: {
          notice: true,
          url: '/userupdate',
          data: Object.assign({uid:record.uid},values)
        }
      });

      yield put({
        type: 'getPageInfo',
        payload: { pageData }
      });
      success();
    },
    // 删除 之后查询分页
    *remove({ payload }, { call, put, select }) {
      const { records, success } = payload;
      console.log(payload)
      debugger
      const { pageData } = yield select(state => state.crud);
      yield put({
        type: '@request',
        payload: {
          notice: true,
          url: '/userdelete',
          data: { uid: records.map(item => item.rowKey) }
        }
      });
      yield put({
        type: 'getPageInfo',
        payload: { pageData }
      });
      success();
    },
    // 获取员工列表
    *getEmployees({ payload }, { call, put }) {
      yield put({
        type: '@request',
        afterResponse: resp => resp.data,
        payload: {
          valueField: 'employees',
          url: '/crud/getWorkEmployee'
        }
      });
    }
  },
  reducers: {}
});
