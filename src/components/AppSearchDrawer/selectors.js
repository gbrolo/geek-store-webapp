import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectAppSearchDrawerDomain = state =>
  state.appSearchDrawer || initialState;

const makeSelectAppSearchDrawer = () =>
  createSelector(
    selectAppSearchDrawerDomain,
    substate => substate,
  );

export default makeSelectAppSearchDrawer;
export { selectAppSearchDrawerDomain };
