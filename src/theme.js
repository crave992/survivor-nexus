import { createTheme } from '@mui/material/styles';
import { deepPurple, blue } from '@mui/material/colors';

const theme = createTheme({
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          backgroundColor: 'white',
        },
      },
    },
  },
  palette: {
    primary: {
      main: deepPurple[700],
    },
    secondary: {
      main: blue[700],
    },
  },
});

export default theme;