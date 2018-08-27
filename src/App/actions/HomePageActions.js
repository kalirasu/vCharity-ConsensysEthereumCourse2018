import {
          BC_STORE_PROJECT_DETAIL_RETRIEVED,
       } from './types';

export const bcstoreProjectDetailRetrieved = (projDetail) => ({
  type: BC_STORE_PROJECT_DETAIL_RETRIEVED,
  projDetail
});
