/**
 *
 * AppDrawer
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  List,
  Slide,
  ListItem,
  makeStyles,
  Typography,
  ListItemText,
  SwipeableDrawer,
  ListItemSecondaryAction,
} from '@material-ui/core';
import {
  ArrowDropUp,
  ArrowDropDown,
} from '@material-ui/icons';

import { useInjectSaga } from '../../utils/injectSaga';
import { useInjectReducer } from '../../utils/injectReducer';
import makeSelectAppDrawer from './selectors';
import reducer from './reducer';
import saga from './saga';
import { toggleAppDrawer } from './actions';
import { allItemValue, CATEGORY_FEATURED, flashNavItem, homeNavItem } from '../../components/AppMenuBar/constants';
import makeSelectRoot from '../../rootSelectors';
import { selectCategory } from '../ProductsContainer/actions';

const useStyles = makeStyles(theme => ({
  AppDrawer: {    
    '@media (min-width: 600px)': {
      display: 'none',
    },
  },
  AppDrawerListContainer: {    
    width: 250,
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
    height: '100%',
  },
  AppDrawerListItemBase: props => ({
    borderLeft: theme.palette.primary.contrastText,
  }),
  AppDrawerListItemText: {
    fontWeight: 'bold',
    // fontSize: '0.9em',
  },
}));

function AppDrawerListItem({
  item,
  onSelectCategory,  
  onToggleAppDrawer,
}) {
  const classes = useStyles();

  const handlePress = () => {
    onSelectCategory(item.id);
    onToggleAppDrawer();
  };

  return (
    <React.Fragment>
      <ListItem
        button      
        onClick={handlePress}
        className={classes.AppDrawerListItemBase}
      >
        <ListItemText>
          <Typography 
            variant='overline'
            className={classes.AppDrawerListItemText}
          >
            {item.name}
          </Typography>
        </ListItemText>        
      </ListItem>      
    </React.Fragment>
  );
};

export function AppDrawer({
  root,  
  appDrawer,
  onSelectCategory,
  onToggleAppDrawer,  
}) {
  useInjectReducer({ key: 'appDrawer', reducer });
  useInjectSaga({ key: 'appDrawer', saga });

  const classes = useStyles();
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);  

  const toggleDrawer = (e) => {
    if (e && e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
      return;
    }

    onToggleAppDrawer();
  };

  const renderDrawerList = () => (
    <div
      role="presentation"
      className={classes.AppDrawerListContainer}
    >
      <List>
        {
          [CATEGORY_FEATURED, ...root.categories].map(item => {
            return (
              <AppDrawerListItem
                key={item._id}
                item={item}
                onSelectCategory={onSelectCategory}  
                onToggleAppDrawer={onToggleAppDrawer}              
              />              
            );
          })
        }
      </List>
    </div>
  );

  return (
    <SwipeableDrawer
      anchor='left'
      open={appDrawer.open}
      onClose={toggleDrawer}
      onOpen={toggleDrawer}
      disableBackdropTransition={!iOS} 
      disableDiscovery={iOS}
      className={classes.AppDrawer}
    >
      {renderDrawerList()}
    </SwipeableDrawer>
  );
}

AppDrawer.propTypes = {};

const mapStateToProps = createStructuredSelector({
  root: makeSelectRoot(),
  appDrawer: makeSelectAppDrawer(),
});

function mapDispatchToProps(dispatch) {
  return {
    onToggleAppDrawer: () => dispatch(toggleAppDrawer()),
    onSelectCategory: (category) => dispatch(selectCategory(category)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AppDrawer);
