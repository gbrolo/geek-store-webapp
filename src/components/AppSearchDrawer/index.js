/**
 *
 * AppSearchDrawer
 *
 */

import React, { memo, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  fade,
  List,
  Fade,
  Chip,  
  Slide,
  Button,
  Avatar,  
  Toolbar,
  lighten,
  ListItem,
  IconButton,
  makeStyles,
  Typography,
  ListItemText,
  ListItemAvatar,
  SwipeableDrawer,
} from '@material-ui/core';
import {
  Close,
} from '@material-ui/icons';

import { useInjectSaga } from '../../utils/injectSaga';
import { useInjectReducer } from '../../utils/injectReducer';
import makeSelectAppSearchDrawer from './selectors';
import reducer from './reducer';
import saga from './saga';
import { toggleAppSearchDrawer, initiateSearch, unmount } from './actions';

import Loading from '../../components/Loading';
import SearchComponent from '../SearchComponent/Loadable';
import makeSelectSearchComponent from '../SearchComponent/selectors';
import { selectValidPriceForProduct, selectCorrectSaleForProduct, determineIfProductIsOnSale } from '../../utils/helpers';
import { getProducts, getSingleProduct, unmount as unmountProducts } from '../ProductsContainer/actions';
import makeSelectProductsContainer from '../ProductsContainer/selectors';

const useStyles = makeStyles(theme => ({
  AppSearchDrawerContainer: {
    overflowY: 'scroll',
    overflowX: 'hidden',
    position: 'relative',        
    padding: theme.spacing(2),  
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.paper,
    height: '100%',
    width: 350,
    '@media (max-width: 600px)': {
      width: '100%',
    },
    '-webkit-overflow-scrolling': 'touch',    
    '&::-webkit-scrollbar': {
      width: theme.spacing(0.5),
      height: '8px',      
    },
    'scrollbar-color': `${theme.palette.primary.dark} ${fade(theme.palette.primary.dark, 0.2)}`,
    '&::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.3)',
      '-webkit-border-radius': '5px',
      borderRadius: '5px',
      border: `solid 1px ${fade(theme.palette.primary.dark, 0.2)}`,
    },
    '&::-webkit-scrollbar-thumb': {
      '-webkit-border-radius': '5px',
      'border-radius': '5px',
      'background': theme.palette.primary.dark,
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.5)',
    },
    '::-webkit-scrollbar-thumb:window-inactive': {
      background: 'rgba(0,0,0,0.4)', 
    },
  }, 
  AppSearchDrawerTitleContainer: {
    position: 'relative',
    width: '100%',
  },
  AppSearchDrawerTitleContainerCloseButton: {
    position: 'absolute',
    color: theme.palette.text.primary,
    top: -theme.spacing(1),
    right: -theme.spacing(1),
    '@media (max-width: 600px)': {
      top: -theme.spacing(1.4),      
    },
  },
  AppSearchDrawerTitleText: {
    fontWeight: 'bold',
  },
  AppSearchDrawerSearchContainer: {
    width: '100%',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  AppSearchDrawerSearchingLegendText: {
    fontSize: '0.8em',
    color: lighten(theme.palette.text.primary, 0.6),
  },
  SearchListItemAvatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    marginRight: theme.spacing(2),
  },
  SearchListItemTextPrimary: {
    lineHeight: 1.2,
    fontWeight: 'bold',
  },
  SearchListItemTextSecondaryNormal: {    
  },
  SearchListItemTextSecondarySale: {
    fontWeight: 'bold',    
    textTransform: 'uppercase',    
    fontSize: '0.9em',    
  },
  AppSearchDrawerLoaderContainer: {    
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 'auto',
  },
  AppSearchDrawerMoreResultsContainer: {
    position: 'fixed',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    zIndex: theme.zIndex.appBar + 1,
    bottom: 0,
    right: 0,
    width: 350,
    '@media (max-width: 600px)': {
      width: '100%',      
    },
  },
  AppSearchDrawerMoreResultsButton: {   
    borderRadius: 0, 
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
    '&.MuiButton-root.Mui-disabled': {
      color: theme.palette.primary.light,
      pointerEvents: 'auto',
      '&:hover': {
        // backgroundColor: '#121e54',
        cursor: 'not-allowed',
      },
    },
  },
}));

function SearchListItem({
  item,
  slideIn,

  onOpenItem,
  onToggleAppSearchDrawer,
}) {
  const classes = useStyles();

  const handleSelectedItem = () => {
    onOpenItem(item.id);
    onToggleAppSearchDrawer();    
  };

  return(
    <span>
      <Slide
        in={slideIn}
        direction="left"
        timeout={1000}
        mountOnEnter
        unmountOnExit
      >
        <ListItem
          button
          onClick={handleSelectedItem}
        >
          <ListItemAvatar>
            <Avatar 
              src={item.images[0]}
              variant="square"
              className={classes.SearchListItemAvatar}
            />
          </ListItemAvatar>
          <ListItemText
            primary={
              <Typography
                variant="body2"
                className={classes.SearchListItemTextPrimary}
              >
                {item.name}
              </Typography>
            }
            secondary={
              <Typography
                variant="caption"
                className={classes.SearchListItemTextSecondaryNormal}
              >
                {
                  `GTQ. 
                  ${selectValidPriceForProduct(item)} 
                  `
                }
                {
                  determineIfProductIsOnSale(item) ?
                  <Chip
                    color="primary"
                    size="small"
                    label={
                      <Typography
                        variant="body2"
                        className={classes.SearchListItemTextSecondarySale}
                      >
                        {
                          selectCorrectSaleForProduct(
                            item,
                            {
                              salePrice: 'Oferta',
                              normal: '',
                            }
                          )
                        }
                      </Typography>
                    }
                    style={{ margin: '8px' }}
                  /> :
                  null
                }
              </Typography>
            }
          />
        </ListItem>
      </Slide>
    </span>
  );
};

export function AppSearchDrawer({
  appSearchDrawer,
  productsContainer,
  searchComponentValue,

  onUnmount,
  onGetProducts,
  onInitiateSearch,
  onGetSingleProduct,
  onToggleAppSearchDrawer,
  onUnmountProductsContainer,
}) {
  useInjectReducer({ key: 'appSearchDrawer', reducer });
  useInjectSaga({ key: 'appSearchDrawer', saga });

  const classes = useStyles();
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

  useEffect(() => {
    return () => {
      onUnmount();
    };
  }, []);

  const toggleDrawer = (e) => {
    if (e && e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
      return;
    }

    onToggleAppSearchDrawer();
  };

  const handleShowMoreResults = () => {
    onToggleAppSearchDrawer();  
    onUnmountProductsContainer();
    onGetProducts(
      productsContainer.condition, 
      productsContainer.size, 
      0, 
      searchComponentValue.queryString
    );  
  };

  const onHandleSearchEnter = (queryString) => {
    onToggleAppSearchDrawer();
    // dispatch search action
    onUnmountProductsContainer();
    onGetProducts(
      productsContainer.condition, 
      productsContainer.size, 
      0, 
      queryString
    );
  };

  const renderTitle = () => (
    <div
      className={classes.AppSearchDrawerTitleContainer}
    >
      <Typography
        variant="h5"
        className={classes.AppSearchDrawerTitleText}
      >
        Buscar
      </Typography>
      <IconButton
        onClick={onToggleAppSearchDrawer}
        className={classes.AppSearchDrawerTitleContainerCloseButton}
      >
        <Close />
      </IconButton>
    </div>
  );

  const renderContent = () => (
    <Fade
      in={appSearchDrawer.content !== null && appSearchDrawer.content.length > 0}
      timeout={500}
      mountOnEnter
      unmountOnExit
    >
      <List>
        {
          appSearchDrawer.content !== null && appSearchDrawer.content.length > 0 ?
          appSearchDrawer.content.map(item => (
            <SearchListItem
              key={item.id}
              item={item}              
              searchComponentValue={searchComponentValue}
              onOpenItem={onGetSingleProduct}
              onToggleAppSearchDrawer={onToggleAppSearchDrawer}
              slideIn={appSearchDrawer.content !== null && appSearchDrawer.content.length > 0}
            />
          )) :
          null
        }
      </List>
    </Fade>
  );

  const renderEmptyContentMessage = () => (
    <Fade
      in={appSearchDrawer.content !== null && appSearchDrawer.content.length === 0}      
      mountOnEnter
      unmountOnExit
    >
      <Typography
        variant="h6"
      >
        No hay resultados para tu búsqueda. Por favor intenta de nuevo utilizando otros términos de búsqueda.
      </Typography>
    </Fade>
  );

  const renderSearchComponent = () => (
    <div
      className={classes.AppSearchDrawerSearchContainer}
    >
      <SearchComponent 
        onEnter={onHandleSearchEnter}
        onBindedAction={onInitiateSearch}        
      />

      <Fade
        in={searchComponentValue.queryString !== ''}
        mountOnEnter
        unmountOnExit
      >
        <Typography
          variant="caption"
          className={classes.AppSearchDrawerSearchingLegendText}
        >
          {`Mostrando resultados de tu búsqueda para "${searchComponentValue.queryString}"`}
        </Typography>
      </Fade>
    </div>
  );

  const renderLoader = () => (
    <div
      className={classes.AppSearchDrawerLoaderContainer}
    >
      <Loading
        render={appSearchDrawer.searching}
      />
    </div>
  );

  const renderMoreResultsButton = () => (
    appSearchDrawer.content !== null &&
    appSearchDrawer.content.length > 2 ?
    <Fade
      in={appSearchDrawer.content !== null && appSearchDrawer.content.length > 2}
      timeout={500}
      mountOnEnter
      unmountOnExit
    >
      <span>
        <Toolbar />
        <div
          className={classes.AppSearchDrawerMoreResultsContainer}
        >
          <Button          
            variant="contained"
            fullWidth
            onClick={handleShowMoreResults}
            className={classes.AppSearchDrawerMoreResultsButton}
          >
            <Typography
              variant="overline"
            >
              Ver todos los resultados
            </Typography>
          </Button>
        </div>
      </span>
    </Fade> :
    null
  );

  const renderDrawerContainer = () => (
    <div
      role="presentation"
      className={classes.AppSearchDrawerContainer}
    >
      {renderTitle()} 
      {renderSearchComponent()}
      {renderContent()}
      {renderEmptyContentMessage()}
      {renderLoader()}
      {renderMoreResultsButton()}
    </div>
  );

  return (
    <SwipeableDrawer
      anchor='right'
      open={appSearchDrawer.open}
      onClose={toggleDrawer}
      onOpen={toggleDrawer}
      disableBackdropTransition={!iOS} 
      disableDiscovery={iOS}      
    >
      {renderDrawerContainer()}
    </SwipeableDrawer>
  );
}

AppSearchDrawer.propTypes = {};

const mapStateToProps = createStructuredSelector({  
  appSearchDrawer: makeSelectAppSearchDrawer(),
  productsContainer: makeSelectProductsContainer(),
  searchComponentValue: makeSelectSearchComponent(),
});

function mapDispatchToProps(dispatch) {
  return {
    onUnmount: () => dispatch(unmount()),
    onGetProducts: (condition, size, page, search) => dispatch(getProducts(condition, size, page, search)),
    onInitiateSearch: () => dispatch(initiateSearch()),
    onToggleAppSearchDrawer: () => dispatch(toggleAppSearchDrawer()),
    onUnmountProductsContainer: () => dispatch(unmountProducts()),
    onGetSingleProduct: (currentItem) => dispatch(getSingleProduct(currentItem)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AppSearchDrawer);
