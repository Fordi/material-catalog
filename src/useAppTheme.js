import { createTheme, responsiveFontSizes } from "@mui/material";
import { useMemo } from "react";

const useAppTheme = () => useMemo(() => responsiveFontSizes(createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#30a0ff',
      light: '#8bc6ff',
      dark: '#0080ef',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#7e9db1',
      light: '#c0d6e3',
      dark: '#4b738c',
      contrastText: '#ffffff',
    },
    background: {
      default: '#29292f',
      paper: '#1d1d21',
    },
    text: {
      primary: '#fdfdfd',
      secondary: '#dbdbdc',
      disabled: '#a2a2a4',
      hint: '#a2a2a4',
    },
    error: {
      main: '#ff444c',
      light: '#f9979a',
      dark: '#f61a30',
      text: '#ffffff',
    },
    divider: '#41434C',
  },
  shape: {
    // borderRadius: '1rem',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '1.5rem',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        InputLabelProps: { shrink: true },
        fullWidth: true,
      },
    },
  },
})), []);

export default useAppTheme;