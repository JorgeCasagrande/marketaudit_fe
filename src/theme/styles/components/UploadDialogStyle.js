const UploadDialogStyle = theme => ({
  input: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0
  },
  title: {
    backgroundColor: '#003a60',
    color: '#ffffff' 
  },
  text14: {
    fontSize: '14px',
    color: '#003a60'
  },
  text12: {
    fontSize: '12px',
    color: '#71839b'
  },
  textError12: {
    fontSize: '12px',
    color: '#e00001'
  },
  attachSection: {
    display: 'flex',
    flexDirection: 'column',
  },
  marginBotton: {
    marginBottom: '12px'
  },
  fileNameAttachSection: {
    display: 'flex',
    alignItems: 'center'
  },
  closeIcon: {
    marginLeft: '5px'
  },
  close: {
    padding: theme.spacing(0.5),
  },
  linkdownload: {
    cursor: 'pointer'
  }

});

export default UploadDialogStyle;