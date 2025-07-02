import './GenericModal.scss';
import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress
} from '@material-ui/core';

const GenericModal = (props) => {
  const {
    title,
    openDialog, 
    handleCloseDialog, 
    okName,
    cancelName,
    handleOk,
    children,
    isOkButtonDisabled,
    size,
  } = props;

  const [loading, setLoading] = useState(false);

  const handleClickOk = () => {
    setLoading(true);
    handleOk();
  };

  const handleClickCancel = () => {
    setLoading(false);
    handleCloseDialog();
  }

  React.useEffect(() => {
    if (openDialog === false) {
      setLoading(false);
    }
  }, [openDialog])
  
  return (
    <Dialog
      open={openDialog}
      onClose={handleClickCancel}
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth={size || 'sm' }
    >
      <DialogTitle className='title'>{title}</DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClickCancel}
          disabled={loading}
        >
          {cancelName}
        </Button>
        <Button
          disabled={isOkButtonDisabled}
          className='ok-button'
          onClick={handleClickOk}
        >
          {
            loading ? <CircularProgress size={24}/> : `${okName}`
          }
        </Button>
      </DialogActions>
    </Dialog>
  );

}

export default GenericModal;