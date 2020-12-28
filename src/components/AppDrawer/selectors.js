import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectAppDrawerDomain = state => state.appDrawer || initialState;

const makeSelectAppDrawer = () =>
  createSelector(
    selectAppDrawerDomain,
    substate => substate,
  );

export default makeSelectAppDrawer;
export { selectAppDrawerDomain };
