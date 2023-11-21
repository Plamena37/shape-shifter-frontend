import { createTheme, styled } from "@mui/material";
import type { ThemeOptions } from "@mui/material/styles";
import { MaterialDesignContent } from "notistack";

export const StyledMaterialDesignContent = styled(MaterialDesignContent)(
  () => ({
    "&.notistack-MuiContent-success": {
      backgroundColor: "#2eb47b",
    },
  })
);

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: false;
    sm: false;
    md: false;
    lg: false;
    xl: false;
    mobile: true;
    tablet: true;
    laptop: true;
    desktop: true;
    largeScreen: true;
  }
}

export const themeOptions: ThemeOptions = {
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 700,
      laptop: 770,
      desktop: 1024,
      largeScreen: 1200,
    },
  },
  palette: {
    primary: {
      main: "#32a184",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: "#318974",
        },
      },
      variants: [
        {
          props: {
            variant: "contained",
          },
          style: {
            "&:disabled": {
              backgroundColor: "#9d9d9d",
              color: "#fff",
            },
            "&:hover": {
              backgroundColor: "#318974",
            },
            backgroundColor: "#32a184",
            color: "#fff",
          },
        },
        {
          props: {
            variant: "outlined",
          },
          style: {
            "&:hover": {
              backgroundColor: "#f3f3f3",
            },
            backgroundColor: "#fff",
            color: "#318974",
          },
        },
      ],
    },
  },
};

const theme = createTheme(themeOptions);
export default theme;
