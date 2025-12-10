import { Box, Typography, useTheme } from "@mui/material";

export const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        py: 2,
        textAlign: "center",
        bgcolor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        borderTop: `1px solid ${theme.palette.primary.main}`,
      }}
    >
      <Typography
        variant="body2"
        sx={{
          fontSize: "0.85rem",
          letterSpacing: 1,
          color: theme.palette.text.secondary,
        }}
      >
        HackMart © {new Date().getFullYear()}
      </Typography>
    </Box>
  );
};

export default Footer;
