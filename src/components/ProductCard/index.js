import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion } from "framer-motion";
import clsx from 'clsx';
import {
  Grid,
  Grow,
  Zoom,
  Paper,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { useWindowSize } from '../../utils/hooks';
import { determineIfProductIsOnSale, shortenString, selectValidPriceForProduct } from '../../utils/helpers';

const useStyles = makeStyles(theme => ({
  ProductCardWrapper: {    
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),
    flexDirection: 'column',
    minHeight: theme.spacing(10) * 6,
    width: '100%',
    height: '100%',
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    cursor: 'pointer',
  },
  ProductCardName: {
    textAlign: 'left',
    fontSize: '1.1em',
    fontWeight: '600',
    textTransform: 'uppercase',
    lineHeight: 1.3,
    color: theme.palette.text.primary,
  },
  ProductCardDescription: {
    textAlign: 'left',
    fontSize: '0.9em',
    fontWeight: '300',    
    lineHeight: 1.3,
    color: theme.palette.text.secondary,
    // letterSpacing: 0.9,
  },
  ProductCardImage: {       
    position: 'absolute',     
    maxWidth: '100%',
    maxHeight: '100%',
    '&:hover': {
      cursor: 'pointer',
    },    
  },
  ProductCardImageContainer: {    
    position: 'relative',
    width: '95%',
    minHeight: theme.spacing(10) * 3,
    minWidth: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',    
  },
  ProductCardPriceContainer: {
    position: 'absolute',
    right: -theme.spacing(1),
    left: 'unset',    
    top: theme.spacing(2),
    bottom: 'unset',
    minWidth: '50%',
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    zIndex: theme.zIndex.appBar - 1,
  },
  ProductCardPriceContainerAlt: {    
    top: theme.spacing(8),
    bottom: 'unset',
    left: 'unset',
    right: -theme.spacing(1),
    minWidth: '25%',    
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    textDecoration: 'line-through',
  },
  ProductCardPrice: {
    textAlign: 'center',
    fontSize: '1em',
    fontWeight: 'bold',
    textTransform: 'uppercase',    
    color: theme.palette.text.primary,
  },
  ProductCardPriceAlt: {
    textAlign: 'center',
    fontSize: '1em',
    fontWeight: 'bold',
    textTransform: 'uppercase',    
    color: theme.palette.text.primary,
  },
}));

function ProductCard({
  product,
  renderContent,
  onLoadSingleProduct,
}) {
  const classes = useStyles();
  const [isOnSale, setIsOnSale] = useState(false);

  const windowDimensions = useWindowSize();

  useEffect(() => {
    if (product !== null) {
      setIsOnSale(
        determineIfProductIsOnSale(product)
      );      
    }
  }, [product]);

  const handleOpenProduct = () => {
    onLoadSingleProduct(product.id);
  };

  const renderProductTextElement = (className, component) => (
    <Grid
      item
      xs={12} sm={12} md={12} lg={12}
    >
      <Typography          
        className={className}
      >
        {component}
      </Typography>
    </Grid>
  );

  const renderImage = () => (
    <Grid
      item
      xs={12} sm={12} md={12} lg={12}
      className={classes.ProductCardImageContainer}
    >
      <img
        src={product.images[0]}
        className={classes.ProductCardImage}
      />
    </Grid>
  );

  const renderName = () => renderProductTextElement(
    classes.ProductCardName,
    product.name,
  );

  const renderDescription = () => renderProductTextElement(
    classes.ProductCardDescription,
    shortenString(product.description, 75),
  );

  // const renderName = () => (
  //   <Grid
  //     item
  //     xs={12} sm={12} md={12} lg={12}
  //   >
  //     <Typography          
  //       className={classes.ProductCardName}
  //     >
  //       {product.name}
  //     </Typography>
  //   </Grid>
  // );

  // const renderDescription = () => (
  //   <Grid
  //     item
  //     xs={12} sm={12} md={12} lg={12}
  //   >
  //     <Typography          
  //       className={classes.ProductCardDescription}
  //     >
  //       {shortenString(product.description, 75)}
  //     </Typography>
  //   </Grid>
  // );

  const renderPriceTag = () => (
    <Zoom
      in={renderContent}
      {...(renderContent ? { timeout: renderContent ? 800 : 0 } : { timeout: renderContent ? 800 : 0 })}
      mountOnEnter
      unmountOnExit
    >
      <Paper
        elevation={6}
        className={classes.ProductCardPriceContainer}
      >
        <Typography          
          className={classes.ProductCardPrice}
        >
          GTQ. {selectValidPriceForProduct(product)}
        </Typography>
      </Paper>
    </Zoom>    
  );

  const renderOriginalPriceTagWhenOnSale = () => (
    <Zoom
      in={isOnSale}
      {...(renderContent ? { timeout: renderContent ? 1200 : 0 } : { timeout: renderContent ? 1200 : 0 })}
      mountOnEnter
      unmountOnExit
    >
      <Paper
        elevation={6}
        className={clsx(classes.ProductCardPriceContainer, classes.ProductCardPriceContainerAlt)}
      >
        <Typography          
          className={classes.ProductCardPriceAlt}
        >
          GTQ. {product.price}
        </Typography>
      </Paper>
    </Zoom>
  );  

  return (
    <motion.div
      onTapStart={windowDimensions.width > 768 ? handleOpenProduct : () => {}}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: windowDimensions.width > 768 ? 0.09 : 0.99 }}
      style={{ width: '100%', height: '100%' }}
    >
      <Grow
        in={renderContent}
        mountOnEnter
        unmountOnExit
        // style={{transformOrigin: '0 0 0'}}
        {...(renderContent ? { timeout: renderContent ? 1000 : 0 } : { timeout: renderContent ? 1000 : 0 })}
      >
        <Paper
          onClick={windowDimensions.width > 768 ? () => {} : handleOpenProduct}
          elevation={6}
          className={classes.ProductCardWrapper}          
        >
          {renderPriceTag()}
          {renderOriginalPriceTagWhenOnSale()}
          <Grid 
            container
            spacing={3}          
          >
            {renderImage()}
            {renderName()}
            {renderDescription()}
          </Grid>
        </Paper>
      </Grow>
    </motion.div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  renderContent: PropTypes.bool.isRequired,
  onLoadSingleProduct: PropTypes.func.isRequired,
};

ProductCard.defaultProps = {
  renderContent: true,
  onLoadSingleProduct: () => {},
};

export default memo(ProductCard);
