import React, { useState } from 'react';
import {
  DialogContentText,
  Button,
  withStyles,
  Typography,
  IconButton,
  Link,
} from '@material-ui/core';
import UploadDialogStyle from 'theme/styles/components/UploadDialogStyle';
import { Close } from '@material-ui/icons';
import GenericModal from '../../components/common/modal/GenericModal';

const UploadPdvModal = (props) => {
  const {title, contentText, openDialog, handleCloseDialog, classes, handleSave, downloadFile} = props;

  const [fileToUpload, setFileToUpload] = useState([]);
  const [fileName, setFileName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const attachFile = (e) => {
    const files = e.target.files || e.dataTransfer.files;
    setFileToUpload(files);
    const fileName = e.target.files[0].name || e.dataTransfer.files[0].name;
    setFileName(fileName);
  };

  const unAttachFile = () => {
    setFileToUpload([]);
    setFileName('');
    setErrorMessage('');
  };

  const closeDialog = () => {
    unAttachFile();
    handleCloseDialog();
  };

  return (
    <GenericModal
      openDialog={openDialog}
      handleCloseDialog={closeDialog}
      title={title}
      okName='SUBIR'
      cancelName='CANCELAR'
      handleOk={() => handleSave(fileToUpload)}
    >
      <DialogContentText className={classes.text14}>
          {contentText}
        </DialogContentText>
          {
            fileName ?
            <div className={classes.attachSection}>
              <Typography className={classes.text12}>
                Se adjuntó el archivo
              </Typography>
              <div className={classes.fileNameAttachSection}>
              <Typography className={classes.text14}>
                {fileName}
              </Typography>
              <IconButton
                className={classes.closeIcon}
                onClick={unAttachFile}
                disabled={loading}
              >
                <Close/>
              </IconButton>
              </div>
            </div>
            :
            <Button
              variant='outlined'
              color='primary'
              className={classes.marginBotton}
            >
              <Typography>ADJUNTAR XLSX</Typography>
              <input
                type='file'
                className={classes.input}
                onChange={attachFile}
                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              />
            </Button>
          }
          {
            errorMessage &&
            <Typography className={`${classes.textError12} ${classes.marginBotton}`}>{errorMessage}</Typography>
          }
        <DialogContentText fontWeight="fontWeightBold" className={classes.text14}>
          ¿Necesitas ayuda?
        </DialogContentText>
        <DialogContentText className={classes.text14}>
          Descarga la <Link className={classes.linkdownload} onClick={downloadFile} disabled={loading}>planilla de Excel</Link> en blanco
        </DialogContentText>
    </GenericModal>
  )

}

export default withStyles(UploadDialogStyle)(UploadPdvModal);