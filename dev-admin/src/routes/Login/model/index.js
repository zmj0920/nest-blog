import { routerRedux } from 'dva/router';
import { login } from '../service';
import $$ from 'cmn-utils';

export default {
  namespace: 'login',

  state: {
    loggedIn: false,
    message: '',
    user: {},
  },

  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        if (pathname.indexOf('/sign/login') !== -1) {
          $$.removeStore('user');
        }
      });
    }
  },

  effects: {
    *login({ payload }, { call, put }) {
      //  const { status, message, data } = yield call(login, payload);

      const status = 200
 
      const data = {
        age: 49,
        birthday: "1990-12-08",
        city: "陕西省 榆林市",
        name: "熊敏",
        phone: "13188379568",
        token: "1A64e86e-A2A6-f54D-edBD-7e62dFfE79cf",
        userName: "admin",
      }
      if (status) {
        $$.setStore('user', data);
        yield put(routerRedux.replace('/'));
      } else {
        yield put({
          type: 'loginError',
          payload: {}
        });
      }
    },
    *logout(_, { put }) { }
  },

  reducers: {
    loginSuccess(state, { payload }) {
      return {
        ...state,
        loggedIn: true,
        message: '',
        user: payload
      };
    },
    loginError(state, { payload }) {
      return {
        ...state,
        loggedIn: false,
        message: payload.message
      };
    },
  }
};
