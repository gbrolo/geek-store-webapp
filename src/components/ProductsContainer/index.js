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

import {
  Grid,
  Typography,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  wrapper: {
    width: '100%',
  },
}));

export function ProductsContainer({
  productsContainer,
  onMount,
  onUnmount,
}) {
  useInjectReducer({ key: 'productsContainer', reducer });
  useInjectSaga({ key: 'productsContainer', saga });

  const classes = useStyles();

  useEffect(() => {
    onMount();

    return () => {
      onUnmount();
    }
  }, []);

  return (
    <Grid 
      container
      spacing={2}
      className={classes.wrapper}
    >
      <Grid
        item
        xs={"auto"} sm={"auto"} md={"auto"} lg={"auto"} xl={"auto"}
      >
        <Typography
          variant="h4"
          align="center"
        >
          ProductsContainer
        </Typography>
      </Grid>
    </Grid>
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