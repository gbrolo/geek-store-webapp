import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectProductsContainerDomain = state =>
  state.productsContainer || initialState;

const makeSelectProductsContainer = () =>
  createSelector(
    selectProductsContainerDomain,
    substate => substate,
  );

export default makeSelectProductsContainer;
export { selectProductsContainerDomain };