import { alpha } from "@mui/material";

const themplates = {
  palette: {
    primary: {
      lighter: "#FFF4DE",
      light: "#D6BF83",
      main: "#F3CB49",
      dark: "#B59A2A",
      darker: "#827216",
      contrastText: "#fff",
    },
    secondary: {
      lighter: "#FFE7E3",
      light: "#D18D7B",
      main: "#EC7043",
      dark: "#B05325",
      darker: "#7D3C13",
      contrastText: "#fff",
    },
    info: {
      lighter: "#D0F2FF",
      light: "#74CAFF",
      main: "#1890FF",
      dark: "#0C53B7",
      darker: "#04297A",
      contrastText: "#fff",
    },
    success: {
      lighter: "#E9FCD4",
      light: "#AAF27F",
      main: "#54D62C",
      dark: "#229A16",
      darker: "#08660D",
      contrastText: "#fff",
    },
    warning: {
      lighter: "#FFF7CD",
      light: "#FFE16A",
      main: "#FFC107",
      dark: "#B78103",
      darker: "#7A4F01",
      contrastText: "#000",
    },
    error: {
      lighter: "#FFE7D9",
      light: "#FFA48D",
      main: "#FF4842",
      dark: "#B72136",
      darker: "#7A0C2E",
      contrastText: "#fff",
    },
    grey: {
      0: "#FFFFFF",
      100: "#F9FAFB",
      200: "#F4F6F8",
      300: "#DFE3E8",
      400: "#C4CDD5",
      500: "#919EAB",
      600: "#637381",
      700: "#454F5B",
      800: "#212B36",
      900: "#161C24",
      500_8: alpha("#919EAB", 0.08),
      500_12: alpha("#919EAB", 0.12),
      500_16: alpha("#919EAB", 0.16),
      500_24: alpha("#919EAB", 0.24),
      500_32: alpha("#919EAB", 0.32),
      500_48: alpha("#919EAB", 0.48),
      500_56: alpha("#919EAB", 0.56),
      500_80: alpha("#919EAB", 0.8),
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorDefault: {
          // backgroundColor: "#8B0000",
          // backgroundColor: "#F4CB49",
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          minWidth: "48px",
          "@media (min-width:0px) and (orientation: landscape)": {
            minHeight: 48,
          },
          "@media (min-width:600px)": { minHeight: 48 },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        outlined: {
          height: "40px",
          textTransform: "none",
          border: "2px solid #000",
        },
        contained: {
          height: "40px",
          textTransform: "none",
          border: "2px solid #000",
        },
      },
    },
  },
};

export default themplates;
