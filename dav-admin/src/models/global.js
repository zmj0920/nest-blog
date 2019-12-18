// import $$ from 'cmn-utils';
import modelEnhance from '@/utils/modelEnhance';
import menu from '../menu';
export default modelEnhance({
  namespace: 'global',
  state: {
    menu: [],
    flatMenu: [],
  },
  effects: {
    *getMenu({ payload }, { put }) {
      const loopMenu = (items, pitem = {}) => {
        let result = [];
        items.forEach(item => {
          if (pitem.path) {
            item.parentPath = pitem.parentPath ? pitem.parentPath.concat(pitem.path) : [pitem.path];
          }
          if (item.children && item.children.length) {
            result.concat(loopMenu(item.children, item));
          }
          result.push(item);
        });
        return result;
      }
      yield put({
        type: 'getMenuSuccess',
        payload: loopMenu(menu),
      });
    },
  },
  reducers: {
    getMenuSuccess(state, { payload }) {
      return {
        ...state,
        menu: payload,
        flatMenu: getFlatMenu(payload),
      };
    }
  },
});

export function getFlatMenu(menus) {
  let menu = [];
  menus.forEach(item => {
    if (item.children) {
      menu = menu.concat(getFlatMenu(item.children));
    }
    menu.push(item);
  });
  return menu;
}