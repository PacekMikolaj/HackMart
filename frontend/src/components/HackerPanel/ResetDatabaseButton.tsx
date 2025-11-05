import { useState } from "react";
import { Button, CircularProgress, Snackbar, Alert } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { fetchReset } from "../../api/reset";
import { useCart } from "../../context/cartContext";
import { useTranslation } from "react-i18next";

const ResetDatabaseButton = () => {
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const { t } = useTranslation();
  const { clearCart } = useCart();

  const mutation = useMutation({
    mutationFn: fetchReset,
    onSuccess: () => {
      clearCart();
      setSuccessOpen(true);
    },
    onError: (err) => {
      console.error("Error resetting database:", err);
      setErrorOpen(true);
    },
  });

  const handleClick = () => {
    const confirmed = window.confirm(t("admin.resetInfo"));
    if (confirmed) {
      mutation.mutate();
    }
  };

  return (
    <div style={{ marginTop: "2rem", textAlign: "center" }}>
      <Button
        variant="contained"
        color="error"
        onClick={handleClick}
        disabled={mutation.isPending}
        startIcon={mutation.isPending ? <CircularProgress size={20} /> : null}
      >
        {mutation.isPending ? t("auth.loading") : t("admin.reset")}
      </Button>

      <Snackbar
        open={successOpen}
        autoHideDuration={3000}
        onClose={() => setSuccessOpen(false)}
      >
        <Alert severity="success" onClose={() => setSuccessOpen(false)}>
          {t("admin.resetSucess")}
        </Alert>
      </Snackbar>

      <Snackbar
        open={errorOpen}
        autoHideDuration={3000}
        onClose={() => setErrorOpen(false)}
      >
        <Alert severity="error" onClose={() => setErrorOpen(false)}>
          {t("admin.resetError")}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ResetDatabaseButton;
