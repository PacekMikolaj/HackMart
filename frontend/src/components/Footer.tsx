import { Box, Typography, IconButton, Stack, useTheme } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

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

      {/* <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 1 }}>
        <IconButton
          component="a"
          href="https://github.com/"
          target="_blank"
          rel="noopener"
          sx={{
            color: theme.palette.text.primary,
            transition: "transform 0.3s ease, color 0.3s ease",
            "&:hover": {
              transform: "scale(1.2)",
              color: theme.palette.primary.main,
            },
          }}
        >
          <GitHubIcon />
        </IconButton>

        <IconButton
          component="a"
          href="https://twitter.com/"
          target="_blank"
          rel="noopener"
          sx={{
            color: theme.palette.text.primary,
            transition: "transform 0.3s ease, color 0.3s ease",
            "&:hover": {
              transform: "scale(1.2)",
              color: "#1DA1F2",
            },
          }}
        >
          <TwitterIcon />
        </IconButton>

        <IconButton
          component="a"
          href="https://linkedin.com/"
          target="_blank"
          rel="noopener"
          sx={{
            color: theme.palette.text.primary,
            transition: "transform 0.3s ease, color 0.3s ease",
            "&:hover": {
              transform: "scale(1.2)",
              color: "#0077b5", // LinkedIn niebieski
            },
          }}
        >
          <LinkedInIcon />
        </IconButton>
      </Stack> */}
    </Box>
  );
};

export default Footer;
