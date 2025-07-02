import {defaultColor} from 'theme/styles/GeneralStyle';

const ListFilterStyle = theme => ({
  secondaryIcon: {
    right: '0px',
  },
  list: {
    backgroundColor: '#ffffff',
  },
  bottomBorder: {
    borderBottom: 'solid',
    borderBottomColor: '#f4f8f9'
  },
  subHeader: {
    paddingLeft: '0px',
    paddingRight: '0px'
  },
  defaultColor: {
    color: defaultColor
  },
  itemColor: {
    color: '#71839b'
  },
  iconOption: {
    height: '35px',
    width: '35px',
    paddingRight: '5px'
  }
});

export default ListFilterStyle;