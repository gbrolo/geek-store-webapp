import React, { memo } from 'react';
import { connect } from 'react-redux';
import {
  Snackbar,
  makeStyles,
} from '@material-ui/core';
import {
  Alert,
} from '@material-ui/lab';

import { closeProcessFeedback } from './actions';

const AlertComponent = (props) => {
  return <Alert elevation={6} variant='filled' {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const ProcessFeedback = (props) => {
  const classes = useStyles();  

  const onDismiss = (e, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    props.onStateDismiss();    
  }

  const renderDefaultProcessingMessage = (showDefaultProcessingMessage) => (
    showDefaultProcessingMessage ?
    `Procesando tu solicitud` :
    null
  );

  return (
    <div className={classes.root}>
      <Snackbar
        onClose={onDismiss}
        open={props.settings.open}
        anchorOrigin={{vertical: 'top', horizontal: 'center'}}
        autoHideDuration={props.settings.autoHideDuration}
      >
        <AlertComponent
          onClose={onDismiss}
          severity={props.settings.severity}
        >
          { renderDefaultProcessingMessage(props.settings.showDefaultProcessingMessage) }
          { props.settings.message }
        </AlertComponent>
      </Snackbar>      
    </div>
  );
}

ProcessFeedback.propTypes = {};

const mapStateToProps = (state) => {
  return {
    settings: state.feedback.settings,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onStateDismiss: () => dispatch(closeProcessFeedback()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(memo(ProcessFeedback));
