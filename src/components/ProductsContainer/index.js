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
import { getProducts, getSingleProduct, mount, showSingleProduct, unmount } from './actions';

import {
  Grid,
  Slide,
  Dialog,
  Typography,
  makeStyles,
} from '@material-ui/core';
import Loading from '../Loading';
import ProductCard from '../ProductCard/Loadable';
import ProductViewer from '../ProductViewer/Loadable';

const useStyles = makeStyles(theme => ({
  grid: {
    width: '98%',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    '@media (min-width: 1440px)': {
      width: '75%',
    },
    '@media (min-width: 2500px)': {
      width: '50%',
    },
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function ProductsContainer({
  productsContainer,
  onMount,
  onUnmount,
  onGetProducts,
  onGetSingleProduct,
  onShowSingleProduct,
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

  const onReachedBottom = () => {
    if (!productsContainer.loading && !productsContainer.stopFetching) {
      onGetProducts(
        productsContainer.condition, 
        productsContainer.size, 
        productsContainer.page, 
        productsContainer.search
      );
    }
  };
  
  useBottomScrollListener(onReachedBottom);

  const renderLoadingSpinner = () => (
    <Loading render={productsContainer.loading}/>
  );

  const renderEmptyCollectionMessage = () => (
    <Typography
      variant="h6"
      align="center"
    >
      There's nothing we can show here, please try to search content or navigate into another category.
    </Typography>
  );

  const renderProducts = () => (
    productsContainer.renderContent &&
    productsContainer.products.length > 0 ?
    <Grid
      container
      spacing={3}
      className={classes.grid}
    >
      {
        productsContainer.products.map(product => (
          <Grid
            item
            key={product.id}
            xs={12} sm={6} md={4} lg={3}
          >
            <ProductCard              
              product={product}
              renderContent={productsContainer.renderContent}
              onLoadSingleProduct={onGetSingleProduct}
            />
          </Grid>
        ))
      }      
    </Grid> :
    !productsContainer.loading ?
    renderEmptyCollectionMessage() :
    null
  );

  const renderProductViewer = () => (
    <Dialog
      fullScreen
      open={productsContainer.showCurrentItem}
      onClose={() => onShowSingleProduct(false)}
      TransitionComponent={Transition}      
    >
      {
        productsContainer.showCurrentItem ?
        <ProductViewer
          product={productsContainer.currentItem}
          onClose={() => onShowSingleProduct(false)}
        /> :
        null
      }
    </Dialog>
  );

  return (
    <React.Fragment>
      {renderProducts()}
      {renderLoadingSpinner()}
      {renderProductViewer()}
    </React.Fragment>
  );
}

const mapStateToProps = createStructuredSelector({
  productsContainer: makeSelectProductsContainer(),
});

function mapDispatchToProps(dispatch) {
  return {
    onMount: () => dispatch(mount()),
    onUnmount: () => dispatch(unmount()),
    onGetProducts: (condition, size, page, search) => dispatch(getProducts(condition, size, page, search)),
    onGetSingleProduct: (currentItem) => dispatch(getSingleProduct(currentItem)),
    onShowSingleProduct: (showCurrentItem) => dispatch(showSingleProduct(showCurrentItem)),
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