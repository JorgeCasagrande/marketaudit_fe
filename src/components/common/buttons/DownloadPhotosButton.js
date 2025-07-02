import './DownloadButton.scss';
import React, { useState } from 'react';
import { IconButton, CircularProgress } from '@material-ui/core';
import { CloudDownload } from '@material-ui/icons';

const DownloadPhotosButton = (props) => {

  const {downloadOnClick} = props;

  const [loading, setLoading] = useState(false);

  const click = async() => {
    await downloadOnClick().then((response) => {
      setLoading(false);
    }).catch(e => {
      setLoading(false);
    });
  }

  return (
    <>
    {
      loading
      ? ( <CircularProgress size={24}/> )
      : (
        <IconButton
          edge='end'
          onClick={() => {setLoading(true);click();}}
        >
          <CloudDownload/>
          <div className='label'>
            DESCARGAR FOTOS
          </div>
        </IconButton>
      )
    }
    </>
  )
}

export default DownloadPhotosButton;