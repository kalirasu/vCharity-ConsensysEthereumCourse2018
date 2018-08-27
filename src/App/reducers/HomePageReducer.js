import {
          BC_STORE_PROJECT_DETAIL_RETRIEVED,
       } from '../actions/types';

const INITIAL_STATE = {
  projectDetail: new Array(9).fill(0),
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case BC_STORE_PROJECT_DETAIL_RETRIEVED:
      return { ...state, projectDetail: action.projDetail };
    default:
      return state;
    }
};
