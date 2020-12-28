import React, { memo, useState, useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import clsx from 'clsx';
import { motion } from "framer-motion";
import deepcopy from 'deepcopy';
import {
  Grid,
  List,
  Grow,
  Link,
  Chip,
  Fade,
  Dialog,
  AppBar,
  darken, 
  Button,
  Divider,
  Toolbar,
  lighten, 
  ListItem,
  TextField,
  IconButton,
  Typography,
  makeStyles,
  Breadcrumbs,
  ListItemIcon,
  ListItemText,    
} from '@material-ui/core';
import {
  Home,
  ArrowBack,
  CheckCircle,
  HighlightOff,
  NavigateNext,
  FiberManualRecord,
} from '@material-ui/icons';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { parseProductImagesToSliderFormat } from '../../utils/helpers';
import { propertiesLegend, stripProperties } from './constants';

import SliderImage from '../SliderImage/Loadable';
import makeSelectRoot from '../../rootSelectors';

const useStyles = makeStyles(theme => ({
  ProductViewerAppBar: {    
    backgroundColor: theme.palette.primary.main,
  },
  ProductViewerAppBarTitle: {
    fontSize: '1.1em',
    fontWeight: 'bold',
    color: theme.palette.primary.contrastText,
    marginLeft: theme.spacing(2),
    textTransform: 'uppercase',
    lineHeight: 1.2,
  },
  ProductViewerAppBarBackButton: {
    minHeight: '50px',
  },
  ProductViewerAppBarBackIcon: {
    color: theme.palette.primary.contrastText,
  },
  ProductViewerContent: {
    width: '100%',
    height: '100%',
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
  },
  ProductViewerWrapper: {
    backgroundColor: theme.palette.background.default,
  },
  ProductViewerImageViewerContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),    
    '@media (max-width: 600px)': {
      display: 'block',
    },
  },
  ProductViewerListItemTextPrimaryContainer: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'center',
    alignItems: 'center',
  },
  ProductViewerListItemTextPrimaryPlaceholder: {
    color: theme.palette.text.primary,
    fontSize: '1.1em',
    fontWeight: 'bold',
    marginRight: theme.spacing(1),
  },
  ProductViewerListItemTextPrimary: {
    color: theme.palette.text.primary,
    fontSize: '1em',
    fontWeight: '400',
    lineHeight: 1.2,    
  },
  ProductViewerListItemTextPrimaryPriceCurrency: {
    color: theme.palette.text.primary,
    fontSize: '0.95em',
    fontWeight: '300',
    lineHeight: 1.2,
    marginRight: theme.spacing(1),    
  },
  ProductViewerListItemTextPrimaryPrice: {
    color: theme.palette.text.primary,
    fontSize: '1.8em',
    fontWeight: '600',
    lineHeight: 1.2,    
  },
  ProductViewerListItemTextPrimaryPriceBeforeContainer: {    
    display: 'flex',
    justifyContent: 'flex-start',
    alignContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    flexDirection: 'row',
    top: theme.spacing(4),
    left: theme.spacing(14),
  },
  ProductViewerListItemTextPrimaryPriceBefore: {
    color: theme.palette.text.secondary,
    fontSize: '0.7em',
    fontWeight: '300',
    lineHeight: 1.2,   
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    display: 'block' ,
    marginRight: theme.spacing(0.5),
  },
  ProductViewerListItemTextPrimaryPriceBeforePrice: {
    color: theme.palette.text.primary,
    fontSize: '1em',
    fontWeight: '300',
    lineHeight: 1.2,
    textDecoration: 'line-through',
  },
  ProductViewerListItemTextPrimaryTitleText: {
    color: theme.palette.text.primary,
    fontSize: '2em',
    fontWeight: 'bold',
    lineHeight: 1.2,
    textTransform: 'uppercase',
    marginBottom: theme.spacing(2),
    '@media (max-width: 600px)': {
      fontSize: '1.5em',
    }, 
  },
  ProductViewerListItemIcon: {
    color: theme.palette.text.primary,
    fontSize: 12,
  },
  ProductViewerDescriptionTitle: {
    color: theme.palette.text.primary,
    fontSize: '1.5em',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textDecoration: 'underline',
    marginBottom: theme.spacing(2),
  },
  ProductViewerDescriptionText: {    
    color: theme.palette.text.secondary,
    lineHeight: 1.2,
    minHeight: '100px',
    fontSize: '1.1em',
    padding: theme.spacing(0),
    '&:hover': {
      cursor: 'text',
    },
    // '@media (max-width: 600px)': {
    //   paddingBottom: theme.spacing(10),
    // },
  },
  ProductViewerDescriptionDivider: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
  },
  ProductViewerList: {
    width: '100%',
  },
  ProductViewerListItem: {
    width: '100%',
    margin: 0,
    padding: theme.spacing(0.2),
  },
  ProductViewerActionsContainer: {
    position: 'fixed',
    display: 'flex',
    justifyContent: 'flex-end',
    alignContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),    
    bottom: 0,
    zIndex: theme.zIndex.appBar,
    maxHeight: '64px',
    minHeight: '64px',
    backgroundColor: theme.palette.primary.dark,
    width: '100%',
    borderTop: 'solid 1px rgba(0,0,0,0.2)',
    '@media (max-width: 600px)': {
      justifyContent: 'center',
      padding: 0,
      display: 'flex',
      paddingTop: theme.spacing(0.5),   
      backgroundColor: theme.palette.primary.main,   
    },
  },
  ProductViewerAddToCartButton: {    
    minHeight: '45px',    
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
    '&.MuiButton-root.Mui-disabled': {
      color: theme.palette.primary.light,
      pointerEvents: 'auto',
      '&:hover': {        
        cursor: 'not-allowed',
      },
    },
    '@media (max-width: 600px)': {
      width: '100%',
    },
  },
  ProductViewerStockContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',        
  },
  ProductViewerStockTitle: {
    color: theme.palette.text.primary,
    paddingTop: theme.spacing(1),
    fontSize: '1.5em',
    fontWeight: 'bold',    
    marginRight: theme.spacing(1),
  },
  ProductViewerStockChipSuccess: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.success.contrastText,
  },
  ProductViewerStockChipError: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
  },
  ProductViewerStockText: {    
    fontSize: '1em',
    fontWeight: 'bold',
    lineHeight: 1.2,    
  },
  ProductViewerAddToCartButtonText: {
    lineHeight: 1.2,
    fontWeight: 'bold',
  },
  ProductViewerBreadCrumbContainer: {
    width: '100%',
    padding: theme.spacing(2),
  },
  ProductViewerBreadCrumbIcon: {
    width: 20,
    height: 20,
  },
  ProductViewerBreadCrumbLink: {
    display: 'flex',
    textTransform: 'uppercase',
    lineHeight: 1.2,
    color: theme.palette.text.secondary,
    textDecoration: 'none',
    fontSize: '0.8em',
    '&:hover': {      
      color: theme.palette.text.primary,
    },
  },
  ProductViewerBreadCrumbLinkActive: {
    fontWeight: 'bold',
    color: theme.palette.text.primary,
    '&:hover': {
      cursor: 'default',
      textDecoration: 'none',
    },
  },
}));

const parseProductCategory = (product, categories) => {
  return categories.reduce((categoryName, currentCategory) => {
    if (currentCategory.id === product.category) {
      categoryName = currentCategory.name;
    }
    return categoryName;
  }, '');
};

const generateProperties = (propertySet, product) => {
  const initialProperties = deepcopy(propertySet);
  const priceProperty = (
    product.hasOwnProperty('salePrice') ?
    'priceSale' :
    'price'
  );
  return (initialProperties.reduce((props, currentProp) => {
    if (!['priceSale', 'price'].includes(currentProp.type)) {
      props.push(currentProp);
    }
    if (currentProp.type === priceProperty) {
      props.push(currentProp);
    }
    return props;
  }, []));
};

const computeAvailability = (product) => {
  return product.stock > 0;
};

function Heartbeat(props) {
  return (
    <motion.div 
      animate={props.active ? {
        scale: [1, 1.05, 1],
      } : undefined}
      transition={props.active ? {
        duration: 1,
        ease: "easeInOut",  
        times: [0, 0.5, 1],          
        loop: Infinity,
        repeatDelay: 2
      } : undefined}         
      whileHover={props.active ? { 
        scale: 1.05,
        transition: { duration: 0.2 },
      } : undefined}
      whileTap={props.active ? { scale: 0.9 } : undefined}
    >
      {props.children}
    </motion.div>
  );
}

function ProductViewer({
  root,
  product,
  onClose,
}) {
  const classes = useStyles();
  const [images, setImages] = useState([]);
  const [isAvailable, setIsAvailable] = useState(false);
  const [productCategory, setProductCategory] = useState('');
  const [propertiesToShow, setPropertiesToShow] = useState([]);
  const [shouldRenderViewer, setShouldRenderViewer] = useState(false);    

  useEffect(() => {
    if (product !== null && product !== undefined) {
      if (typeof product !== String) {
        
        setImages(
          parseProductImagesToSliderFormat(product.images)
        );
        setProductCategory(
          parseProductCategory(
            product,
            root.categories,
          )
        );
        setPropertiesToShow(
          generateProperties(
            stripProperties,
            product,
          )
        );
        setIsAvailable(
          computeAvailability(
            product,
          )
        );        
        setShouldRenderViewer(true);
      }
    }
  }, [product]);

  const renderViewerBar = () => (
    <React.Fragment>
      <AppBar 
        className={classes.ProductViewerAppBar}        
      >
        <Toolbar>
          <Button
            onClick={onClose}
            startIcon={
              <ArrowBack 
                className={classes.ProductViewerAppBarBackIcon}
              />
            }
            className={classes.ProductViewerAppBarBackButton}
          >
            <Typography
              className={classes.ProductViewerAppBarTitle}
            >
              De regreso a la navegación
            </Typography>
          </Button>          
        </Toolbar>      
      </AppBar>
      <Toolbar />
    </React.Fragment>
  );

  const renderImageViewer = () => {
    const shouldRenderViewerImages = (images.length > 0) && shouldRenderViewer;    
    return (
      shouldRenderViewerImages ?
      <Grow
        in={shouldRenderViewerImages}
        mountOnEnter
        unmountOnExit
        {...(shouldRenderViewerImages ? { timeout: shouldRenderViewerImages ? 800 : 0 } : { timeout: shouldRenderViewerImages ? 800 : 0 })}
      >
        <div
          className={classes.ProductViewerImageViewerContainer}
        >
          <SliderImage
            data={images}
            width="100%" 
            showDescription={false} 
            direction="right"
          />
        </div>
      </Grow> : 
      null
    )
  };

  const renderProductInformationProperty = (property) => {
    const listItemTextContent = (
      <span
        key={property}
        className={classes.ProductViewerListItemTextPrimaryContainer}
      >
        {
          property.withPlaceholder ?
          <Typography
            className={classes.ProductViewerListItemTextPrimaryPlaceholder}
          >
            {propertiesLegend[property.id]}            
          </Typography> :
          null
        }
        {
          property.type.toLowerCase().includes('price') ?
          <Typography
            className={classes.ProductViewerListItemTextPrimaryPriceCurrency}
          >
            {`GTQ. `} 
          </Typography> :
          null
        }
        {
          ['priceSale'].includes(property.type) ?
          <span
            className={classes.ProductViewerListItemTextPrimaryPriceBeforeContainer}
          >
            <Typography
              className={classes.ProductViewerListItemTextPrimaryPriceBefore}
            >
              {`Antes: `}
            </Typography>
            <Typography
              className={classes.ProductViewerListItemTextPrimaryPriceBeforePrice}
            >
              {`GTQ. ${product.price}`}
            </Typography>
          </span> :
          null
        }
        <Typography
          className={
            property.type === 'titleText' ?
            classes.ProductViewerListItemTextPrimaryTitleText :
            property.type.toLowerCase().includes('price') ?
            classes.ProductViewerListItemTextPrimaryPrice :
            classes.ProductViewerListItemTextPrimary
          }
        >
          {
            property.type === 'category' ?
            productCategory :
            product[property.id]
          }          
        </Typography>
      </span>
    );

    const shouldRenderItem = product.hasOwnProperty(property.id);

    return (
      shouldRenderItem ?
      <Grow
        key={property.id}
        in={shouldRenderItem}
        mountOnEnter
        unmountOnExit
        {...(shouldRenderItem ? { timeout: shouldRenderItem ? 1000 : 0 } : { timeout: shouldRenderItem ? 1000 : 0 })}
      >
        <ListItem   
          className={classes.ProductViewerListItem}     
        >
          <ListItemText 
            primary={listItemTextContent}
          />
        </ListItem>
      </Grow> :
      null
    );
  };

  const renderInlineAddToCartButton = () => (
    <Grow
      in={true}
      mountOnEnter
      unmountOnExit
      {...(true ? { timeout: true ? 1200 : 0 } : { timeout: true ? 1200 : 0 })}
    >
      {renderAddToCartButton()}
    </Grow>
  );

  const renderAvailabilityContent = () => (
    <Grow
      in={true}
      mountOnEnter
      unmountOnExit
      {...(true ? { timeout: true ? 1200 : 0 } : { timeout: true ? 1200 : 0 })}
    >
      <div className={classes.ProductViewerStockContainer}>
        <Grid
          container
          spacing={2}
        >
          <Grid
            item
            xs={12} sm={12} md={12} lg={"auto"} xl={"auto"}
          >
            <Typography
              className={classes.ProductViewerStockTitle}
            >
              {`Disponibilidad: `}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12} sm={12} md={12} lg={"auto"} xl={"auto"}
          >
            <Chip
              className={
                isAvailable ?
                classes.ProductViewerStockChipSuccess :
                classes.ProductViewerStockChipError
              }
              icon={
                isAvailable ?
                <CheckCircle 
                  className={
                    isAvailable ?
                    classes.ProductViewerStockChipSuccess :
                    classes.ProductViewerStockChipError
                  }
                /> :
                <HighlightOff 
                  className={
                    isAvailable ?
                    classes.ProductViewerStockChipSuccess :
                    classes.ProductViewerStockChipError
                  }
                />
              }
              label={
                <Typography
                  className={classes.ProductViewerStockText}
                >
                  {
                    isAvailable ?
                    `En stock.` :
                    `Fuera de stock.`
                  }                  
                </Typography>
              }
            />
          </Grid>
        </Grid>
      </div>
    </Grow>
  );

  const renderProductInformation = () => (
    <Grid
      container
      spacing={2}
    >
      <Grid
        item
        xs={12} sm={12} md={12} lg={12}
      >
        {
          propertiesToShow.length > 0 ?
          <List
            className={classes.ProductViewerList}
          >
            {
              propertiesToShow.map(property => {
                return renderProductInformationProperty(property);
              })
            }
          </List> :
          null
        }        
      </Grid>
      <Grid
        item
        xs={12} sm={12} md={12} lg={12}
      >
        {renderAvailabilityContent()}
        <Divider className={classes.ProductViewerDescriptionDivider}/>
        {renderInlineAddToCartButton()}
      </Grid>      
    </Grid>
  );

  const renderProductDescription = () => (
    <Grow
      in={true}
      mountOnEnter
      unmountOnExit
      {...(true ? { timeout: true ? 1500 : 0 } : { timeout: true ? 1500 : 0 })}
    >
      <span>
        <Typography          
          className={classes.ProductViewerDescriptionTitle}
        >
          Información
        </Typography>

        <TextField
          disabled
          multiline
          fullWidth
          value={product.description}      
          InputProps={{ disableUnderline: true }}
          inputProps={{
            className: classes.ProductViewerDescriptionText,
          }}    
        />
      </span>
    </Grow>
  );

  const renderContent = () => (
    <div className={classes.ProductViewerContent}>
      <Grid
        container
        spacing={2}
      >
        <Grid
          item
          xs={12} sm={6} md={6} lg={6}
        >
          {renderImageViewer()}
        </Grid>
        <Grid
          item
          xs={12} sm={6} md={6} lg={6}
        >
          {renderProductInformation()}
          <Divider className={classes.ProductViewerDescriptionDivider}/>          
        </Grid>
        <Grid
          item
          xs={12} sm={12} md={12} lg={12}
          style={{ paddingLeft: '8px', paddingRight: '8px' }}
        >
          {renderProductDescription()}
        </Grid>
      </Grid>
    </div>
  );

  const renderAddToCartButton = (active = undefined) => (
    <Heartbeat
      active={active}
    >
      <Button
        variant="contained"
        className={classes.ProductViewerAddToCartButton}
        onClick={() => {}}
        disabled={
          !(isAvailable)
        }
      >
        <Typography
          variant="overline"
          className={classes.ProductViewerAddToCartButtonText}
        >
          Añadir al carrito
        </Typography>
      </Button>
    </Heartbeat>
  );

  const renderViewer = () => (
    product !== null &&
    product !== undefined &&
    shouldRenderViewer ?
    <div      
      className={classes.ProductViewerWrapper}
    >
      {renderViewerBar()}      
      {renderContent()}
    </div> :
    null
  );

  return (
    renderViewer()
  );
}

ProductViewer.propTypes = {};

const mapStateToProps = createStructuredSelector({
  root: makeSelectRoot(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ProductViewer);
