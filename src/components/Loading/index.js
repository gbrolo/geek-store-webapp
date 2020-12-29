import React, { memo } from 'react';
import {
  Fade,
  makeStyles,
  CircularProgress,
} from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  progress: props => ({
    color: props.color || theme.palette.primary.dark,
    marginBottom: props.marginBottom || theme.spacing(5),    
  }),
}));

const Loading = (props) => {
  const classes = useStyles(props.style);

  const renderProgress = (render) => (
    render ?
    <CircularProgress 
      size={props.size}
      className={classes.progress} 
    /> :
    null
  );

  return (
    <React.Fragment>
      {renderProgress(props.render)}      
    </React.Fragment>
  );
}

Loading.propTypes = {
  render: PropTypes.bool.isRequired,  
};

Loading.defaultProps = {
  size: 40,
  style: {},
  withMessage: false,
};

export default memo(Loading);
