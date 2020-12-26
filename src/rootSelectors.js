import { createSelector } from 'reselect';
import { initialState } from './rootReducer';

const selectRootDomain = state =>
  state.root || initialState;

const makeSelectRoot = () =>
  createSelector(
    selectRootDomain,
    substate => substate,
  );

export default makeSelectRoot;
export { selectRootDomain };