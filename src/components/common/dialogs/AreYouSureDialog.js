import './AreYouSureDialog.scss';
import CustomProgress from 'components/common/customProgress/CustomProgress';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
  Button
 } from '@material-ui/core';

const AreYouSureDialog = (props) => {

  const {open, cancelText, handleCancel, acceptText, handleAccept, title, questionMessage, loading } = props;

  return (
    <Dialog
        open={open}
        disableBackdropClick
        disableEscapeKeyDown
      >
      <DialogTitle className='title'>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {questionMessage}
        </DialogContentText>
      </DialogContent>
      {loading ? <CustomProgress loading={loading}/> :
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          {cancelText}
        </Button>
        <Button className='ok-button' onClick={handleAccept} color="primary" autoFocus>
          {acceptText}
        </Button>
        
      </DialogActions>}
    </Dialog>

  );

};

export default AreYouSureDialog;