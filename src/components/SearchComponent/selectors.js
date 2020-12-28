import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectSearchComponentDomain = state =>
  state.searchComponent || initialState;

const makeSelectSearchComponent = () =>
  createSelector(
    selectSearchComponentDomain,
    substate => substate,
  );

export default makeSelectSearchComponent;
export { selectSearchComponentDomain };
