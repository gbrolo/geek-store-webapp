import React, { memo, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  fade,
  Fade,
  InputBase,
  makeStyles,
} from '@material-ui/core';
import {
  Search,
  Cancel,
} from '@material-ui/icons';

import { useInjectSaga } from '../../utils/injectSaga';
import { useInjectReducer } from '../../utils/injectReducer';
import makeSelectSearchComponent from './selectors';
import reducer from './reducer';
import saga from './saga';
import { initiateSearch, unmount } from './actions';
import { bypassKeycodes } from './constants';

const searchPlaceholder = '¿Qué estás buscando?';

const useStyles = makeStyles(theme => ({
  SearchComponentSearchBar: {
    position: 'relative',
    borderRadius: 0,
    backgroundColor: fade(theme.palette.background.paper, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.background.paper, 0.25),
    },
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 'auto',
    },
  },
  SearchComponentSearchIcon: {
    color: theme.palette.primary.dark,
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  SearchComponentCancelIcon: {
    padding: theme.spacing(0, 2),
    color: theme.palette.primary.dark,
    height: '100%',
    position: 'absolute',
    right: 0,
    top: 0,
    pointerEvents: 'all',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  SearchComponentInputRoot: {
    color: theme.palette.text.primary,
  },
  SearchComponentInputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    paddingRight: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 'auto',
    },
  },
}));

export function SearchComponent({
  searchComponent,

  onEnter,
  onUnmount,
  onBindedAction,
  onInitiateSearch,
}) {
  useInjectReducer({ key: 'searchComponent', reducer });
  useInjectSaga({ key: 'searchComponent', saga });

  const classes = useStyles();
  const inputRef = useRef(null);
  const [text, setText] = useState('');

  // componentDidMount
  useEffect(() => {
    let timeout = null;    

    inputRef.current.onkeyup = (e) => {
      if (!bypassKeycodes.includes(e.keyCode)) {
        clearTimeout(timeout);      
  
        timeout = setTimeout(() => {
          onTextChange(inputRef.current.value);
        }, 500);
      }
    };

    inputRef.current.onkeypress = (e) => {
      if (e.keyCode === 13) {
        e.preventDefault();
        clearTimeout(timeout);        
        setTimeout(() => {
          onEnter(inputRef.current.value);
        }, 0);
      }
    };

  }, [])

  useEffect(() => {
    return () => {
      onUnmount();
    };
  }, []);

  const onTextChange = (newQueryString) => {
    onInitiateSearch(newQueryString);
    onBindedAction();
  };

  const onClear = () => {
    setText('');
    onTextChange('');
  };

  const renderSearch = () => (
    <div className={classes.SearchComponentSearchBar}>
      <div className={classes.SearchComponentSearchIcon}>
        <Search />
      </div>
      <InputBase        
        autoFocus={true}
        value={text}
        type='text'
        inputRef={inputRef}
        placeholder={searchPlaceholder}
        classes={{
          root: classes.SearchComponentInputRoot,
          input: classes.SearchComponentInputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
        onChange={(e) => setText(e.target.value)}
      />
      <Fade
        in={searchComponent.queryString !== ""}
        mountOnEnter
        unmountOnExit
      >
        <div 
          onClick={onClear}
          className={classes.SearchComponentCancelIcon}
        >
          <Cancel/>
        </div>
      </Fade>
    </div>
  );

  return (
    renderSearch()
  );
}

SearchComponent.propTypes = {};
SearchComponent.defaultProps = {
  onEnter: () => {},
};

const mapStateToProps = createStructuredSelector({  
  searchComponent: makeSelectSearchComponent(),
});

function mapDispatchToProps(dispatch) {
  return {
    onUnmount: () => dispatch(unmount()),
    onInitiateSearch: (queryString) => dispatch(initiateSearch(queryString)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(SearchComponent);
