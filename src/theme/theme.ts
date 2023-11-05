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

export const themeOptions: ThemeOptions = {
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
