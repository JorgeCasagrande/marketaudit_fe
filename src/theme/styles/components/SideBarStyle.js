const SideBarStyle = theme => ({
  list: {
    width: 260,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  avatar: {
    width: theme.spacing(3),
    height: theme.spacing(3)
  },
  subheader: {
    margin: '10px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    paddingRight: '15px',
    color: '#71839b'
  },
});

export default SideBarStyle;