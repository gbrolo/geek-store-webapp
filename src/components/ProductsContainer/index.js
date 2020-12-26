import React, { memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';

import { useInjectSaga } from '../../utils/injectSaga';
import { useInjectReducer } from '../../utils/injectReducer';

import makeSelectProductsContainer from './selectors';
import reducer from './reducer';
import saga from './saga';
import { mount, unmount } from './actions';

export function ProductsContainer({
  productsContainer,
  onMount,
  onUnmount,
}) {
  useInjectReducer({ key: 'productsContainer', reducer });
  useInjectSaga({ key: 'productsContainer', saga });

  useEffect(() => {
    onMount();

    return () => {
      onUnmount();
    }
  }, []);

  return (
    <div>
      <h3>ProductsContainer</h3>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  productsContainer: makeSelectProductsContainer(),
});

function mapDispatchToProps(dispatch) {
  return {
    onMount: () => dispatch(mount()),
    onUnmount: () => dispatch(unmount()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ProductsContainer);