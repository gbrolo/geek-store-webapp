import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  wrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    minHeight: '90vh',
    padding: theme.spacing(4),
  },
}));

function ComponentWrapper({
  children,
}) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.wrapper}>
        {children}
      </div>
    </React.Fragment>
  );
};

ComponentWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default memo(ComponentWrapper);