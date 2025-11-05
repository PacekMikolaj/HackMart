import { useState } from "react";
import { Stack, Button, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export type EditableQuantityProps = {
  value: number;
  min?: number;
  max?: number;
  onSave: (newValue: number) => void;
  stockInfo?: number;
  disabled?: boolean;
};

export default function EditableQuantity({
  value,
  min = 1,
  max = Number.MAX_SAFE_INTEGER,
  onSave,
  stockInfo,
  disabled,
}: EditableQuantityProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(String(value));

  const { t } = useTranslation();

  const clamp = (n: number) => Math.min(Math.max(n, min), max);

  const startEdit = () => {
    setDraft(String(value));
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setDraft(String(value));
    setIsEditing(false);
  };

  const confirmSave = () => {
    let next = parseInt(draft, 10);
    if (Number.isNaN(next)) next = value;
    next = clamp(next);

    setDraft(String(next));
    setIsEditing(false);

    if (next !== value) onSave(next);
  };

  return (
    <Stack direction="row" alignItems="center" spacing={1.5}>
      {!isEditing ? (
        <>
          <Typography variant="body2">
            {t("cart.quantity")}: <strong>{value}</strong>
            {typeof stockInfo === "number" ? (
              <Typography
                component="span"
                variant="body2"
                color="text.secondary"
              >
                {" "}
                / {t("product.stock")}: {stockInfo}
              </Typography>
            ) : null}
          </Typography>

          <Button variant="outlined" onClick={startEdit} disabled={disabled}>
            {t("cart.update")}
          </Button>
        </>
      ) : (
        <>
          <TextField
            type="number"
            size="small"
            value={draft}
            inputProps={{ min, max }}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") confirmSave();
              if (e.key === "Escape") cancelEdit();
            }}
            sx={{ width: 110 }}
            disabled={disabled}
          />

          <Button variant="contained" onClick={confirmSave} disabled={disabled}>
            {t("cart.update")}
          </Button>
          <Button variant="text" onClick={cancelEdit} disabled={disabled}>
            {t("cart.cancel")}
          </Button>
        </>
      )}
    </Stack>
  );
}
