import {
          L_BC_STORE_PROJECT_DETAIL_RETRIEVED,
          IPFS_RETRIEVED,
       } from '../actions/types';

const INITIAL_STATE = {
  projectDetail: new Array(9).fill(0),
  ipfsdata: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case L_BC_STORE_PROJECT_DETAIL_RETRIEVED:
      return { ...state, projectDetail: action.projDetail };
    case IPFS_RETRIEVED:
      return { ...state, ipfsdata: action.data };
    default:
      return state;
    }
};
