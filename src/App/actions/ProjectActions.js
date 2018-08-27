import {
          L_BC_STORE_PROJECT_DETAIL_RETRIEVED,
          IPFS_RETRIEVED,
       } from './types';

export const lbcstoreProjectDetailRetrieved = (projDetail) => ({
  type: L_BC_STORE_PROJECT_DETAIL_RETRIEVED,
  projDetail
});

export const ipfsretrieved = (data) => ({
  type: IPFS_RETRIEVED,
  data,
})
