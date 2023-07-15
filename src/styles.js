import { useTheme } from "@mui/material/styles";
//import { styled } from "@mui/material/styles";

export const CommonStylesFunction = () => {
  const theme = useTheme();

  return {
    chatButtonBottom: {
      position: "fixed",
      bottom: 10,
      right: 10,
      zIndex: 1000
    },
    chatIconBottom: { mr: 1 }
  };
};
