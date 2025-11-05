import { Button, Container, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AdminPanel = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
         {t("admin.panel")}
        </Typography>

        <Box sx={{ mt: 3 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/admin/products")}
            sx={{ m: 1 }}
          >
            {t('admin.manageProducts')}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AdminPanel;
