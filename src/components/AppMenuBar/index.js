import React, { memo, useState } from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import {
  Grid,
  Menu,
  Slide,
  Badge,
  AppBar,
  Button,
  Toolbar,
  MenuItem,
  IconButton,
  Typography,
  makeStyles,
} from '@material-ui/core';
import {
  MenuSharp,
  SearchSharp,
  ArrowDropDown,
  TranslateSharp,
  ShoppingCartSharp,
  AccountCircleSharp,
} from '@material-ui/icons';
import makeSelectRoot from '../../rootSelectors';

const useStyles = makeStyles(theme => ({
  AppMenuBarRoot: {
    flexGrow: 1,
  },
  AppMenuBarAppBar: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  AppMenuBarMenuIcon: {
    color: theme.palette.primary.contrastText,
  },
  AppMenuBarLogoDefaultOptions: {
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  AppMenuBarLogoImageOptions: {
    margin: 0,
    maxHeight: '64px',
    maxWidth: '100%',
    '@media (min-width: 600px)': {
      maxWidth: '65%',
    },
    '@media (min-width: 900px)': {
      maxWidth: '85%',
    },
    '@media (min-width: 1030px)': {
      maxWidth: '100%',
    },
  },
  AppMenuBarMobileGridContainer: {    
    '@media (min-width: 600px)': {
      display: 'none',
    },
  },
  AppMenuBarNonMobileGridContainer: {    
    '@media (max-width: 600px)': {
      display: 'none',
    },
  },
  AppMenuBarGridBase: {    
    minHeight: '64px',
  },
  AppMenuBarMobileTitleContainer: {
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    padding: theme.spacing(2),    
  },
  AppMenuBarNonMobileTitleContainer: {
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'flex-start',
    // padding: theme.spacing(2),    
    position: 'absolute',
    zIndex: theme.zIndex.appBar + 1,
    width: '100%',    
    top: 0,        
  },
  AppMenuBarRightOptions: {
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',    
    justifyContent: 'flex-end',
    zIndex: theme.zIndex.appBar + 2,
  },
  AppMenuBarItem: {
    textTransform: 'uppercase',
    fontSize: '0.75em',
    letterSpacing: '0.2em',
    color: theme.palette.secondary.main,
  },
}));

function SlideComponent(props) {
  return (
    <Slide
      in={props.in}
      direction={props.direction || "down"}      
      mountOnEnter
      unmountOnExit
    >
      {props.children}
    </Slide>
  );
};

function AppMenuBarItem({
  category,
}) {
  const classes = useStyles();
  
  return (
    <Button
      variant="outlined"
      color="secondary"
    >
      <Typography
        variant="caption"
        align="center"
        className={classes.AppMenuBarItem}
      >
        {category.name}
      </Typography>
    </Button>
  );
};

function AppMenuBar({
  root,
}) {
  const classes = useStyles();

  const renderLogo = () => (
    <span
      className={classes.AppMenuBarLogoDefaultOptions}      
    >
      <img
        src="https://cdn1.emarketxpress.com/products/geekstore-logo-2.png?token=9lc6wv5c8khqvbj06-1605913308150"
        className={classes.AppMenuBarLogoImageOptions}
      />
    </span>
  );

  const renderNonMobileBar = () => (
    <Grid
      container
      className={clsx(classes.AppMenuBarGridBase, classes.AppMenuBarNonMobileGridContainer)}
    >
      <Grid
        container            
        style={{ position: 'relative', minHeight: '64px' }}
      >
        <SlideComponent
          in={true}
          direction={"right"}
        >
          <div            
            className={classes.AppMenuBarNonMobileTitleContainer}
          >
            {renderLogo()}
          </div>
        </SlideComponent>
        <SlideComponent
          in={true}
          direction={"left"}
        >
          <Grid
            item
            xs={12} sm={12} md={12} lg={12}
            className={classes.AppMenuBarRightOptions}
          >
            <Grid
              container
              spacing={2}
              className={classes.AppMenuBarRightOptions}
            >
              {
                root.categories.map(category => (
                  <Grid
                    item
                    xs={"auto"} sm={"auto"} md={"auto"} lg={"auto"}
                  >
                    <AppMenuBarItem
                      key={category._id}
                      category={category}
                    />
                  </Grid>
                ))
              }
            </Grid>
          </Grid>
        </SlideComponent>
      </Grid>      
    </Grid>
  );

  const renderMobileBar = () => (
    <Grid
      container
      className={clsx(classes.AppMenuBarGridBase, classes.AppMenuBarMobileGridContainer)}
    >
      <Grid
        item
        xs={2} sm={2} md={2} lg={2}
        style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}
      >
        <IconButton
          onClick={() => {}}
          className={classes.AppMenuBarMenuIcon}          
        >
          <MenuSharp />
        </IconButton>
      </Grid>
      <SlideComponent
        in={true}
      >
        <Grid
          item
          xs={10} sm={10} md={10} lg={10}
          className={classes.AppMenuBarMobileTitleContainer}
        >
          {renderLogo()}
        </Grid>
      </SlideComponent>
    </Grid>
  );

  const renderMainToolbar = () => (
    <Toolbar>
      {renderMobileBar()}
      {renderNonMobileBar()}
    </Toolbar>
  );

  const renderBar = () => (
    <React.Fragment>
      <AppBar
        className={classes.AppMenuBarAppBar}
      >
        {renderMainToolbar()}        
      </AppBar>
    </React.Fragment>
  );

  return (
    <div
      className={classes.AppMenuBarRoot}
    >
      {renderBar()}
      <Toolbar />
    </div>
  );
}

AppMenuBar.propTypes = {};

const mapStateToProps = createStructuredSelector({
  root: makeSelectRoot(),
});

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(AppMenuBar));