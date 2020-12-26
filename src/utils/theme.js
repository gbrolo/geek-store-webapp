import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

const defaultThemeSchema = {
  palette: {
    tonalOffset: 0.2,
    contrastThreshold: 3,
    primary: {
      main: '#24305E',
      contrastText: '#fff',
    },
    secondary: {
      main: '#5e2444',
      contrastText: '#fff',
    },
    error: {
      main: '#F76C6C',
      contrastText: '#fff',
    },
    warning: {
      main: '#f7d26c',
      contrastText: '#a67b05',
    },
    info: {
      main: '#6cadf7',
      contrastText: '#244b78',
    },
    success: {
      main: '#56cf2b',
      contrastText: '#265c13',
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.54)',
      disabled: 'rgba(0, 0, 0, 0.38)',
      hint: 'rgba(0, 0, 0, 0.38)',
    },
    background: {
      paper: '#fff',
      default: '#fafafa',
    },
  }
};

const theme = createMuiTheme(defaultThemeSchema);

const muiTheme = responsiveFontSizes(theme);
export default muiTheme;
export { defaultThemeSchema };