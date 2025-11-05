import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  Box,
  Typography,
  ThemeProvider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import vulnerabilities from "../../data/vulnerabilities.keyed.json";
import { VulnerabilityItem } from "./VulnerabilityItem";
import { VulnerabilityKeyed } from "../../types/vulnerability";
import { useQuery } from "@tanstack/react-query";
import { fetchProgress } from "../../api/progress";
import ResetDatabaseButton from "./ResetDatabaseButton";
import { useTranslation } from "react-i18next";
import hackerTheme from "../../theme/hackerTheme";

const HackerPanel: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useQuery<Record<string, boolean>>({
    queryKey: ["progress"],
    queryFn: fetchProgress,
  });
  const { t } = useTranslation();

  const toggleDrawer = (state: boolean) => () => {
    setOpen(state);
  };

  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    {}
  );
  const [revealedHints, setRevealedHints] = useState<Record<string, number>>(
    {}
  );

  const toggleExpand = (id: string) => {
    setExpandedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const revealNextHint = (id: string, total: number) => {
    setRevealedHints((prev) => ({
      ...prev,
      [id]: Math.min((prev[id] || 0) + 1, total),
    }));
  };

  return (
    <>
      <IconButton
        onClick={toggleDrawer(!open)}
        sx={{
          position: "fixed",
          top: "50%",
          right: 0,
          transform: "translateY(-50%)",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "#ff5722",
          borderRadius: "4px 0 0 4px",
          color: "white",
          "&:hover": {
            backgroundColor: "#e64a19",
          },
        }}
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: (theme) => ({
            width: "70%",
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              background: theme.palette.background.default,
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: theme.palette.primary.main,
              borderRadius: 4,
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: theme.palette.primary.dark,
            },
            scrollbarWidth: "thin",
            scrollbarColor: `${theme.palette.primary.main} ${theme.palette.background.default}`,
          }),
        }}
      >
        {isLoading && data ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <Typography variant="h6" gutterBottom>
              {t("auth.loading")}
            </Typography>
          </Box>
        ) : (
          <Box p={2}>
            <Typography variant="h4" gutterBottom>
              {t("admin.hackerPanel")}
            </Typography>
            {vulnerabilities.map((vuln: VulnerabilityKeyed) => (
              <VulnerabilityItem
                key={vuln.id}
                id={vuln.id}
                title={t(vuln.titleKey)}
                description={t(vuln.descriptionKey)}
                task={t(vuln.taskKey)}
                link={vuln.link}
                hints={vuln.hintsKeys.map((key) => t(key))}
                completed={data?.[vuln.id] ?? false}
                isExpanded={!!expandedItems[vuln.id]}
                revealed={revealedHints[vuln.id] || 0}
                onToggleExpand={() => toggleExpand(vuln.id)}
                onRevealHint={() =>
                  revealNextHint(vuln.id, vuln.hintsKeys.length)
                }
              />
            ))}
          </Box>
        )}
        <ResetDatabaseButton />
      </Drawer>
    </>
  );
};

const ThemedHackerPanel = () => (
  <ThemeProvider theme={hackerTheme}>
    <HackerPanel />
  </ThemeProvider>
);

export default ThemedHackerPanel;
