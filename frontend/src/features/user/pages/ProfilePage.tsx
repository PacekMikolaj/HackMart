import { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { useAuth } from "../../../context/authContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchUserProfile, updateUser } from "../../../api/user";
import { UpdateUserRequest } from "../../../types/user";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";

const ProfilePage = () => {
  const { id } = useAuth();
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchUserProfile,
  });

  const mutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () =>
      enqueueSnackbar(t("info.profileUpdateSuccess"), { variant: "success" }),
    onError: (error: any) => {
      enqueueSnackbar(t("info.profileUpdateError"), { variant: "error" });
      console.error(error);
    },
  });

  const [formData, setFormData] = useState<UpdateUserRequest>({});

  const handleChange =
    (field: keyof UpdateUserRequest) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [field]: e.target.value });
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    mutation.mutate({ id: id!, data: formData });
  };

  if (isLoading || !profile) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        {t("admin.yourAccount")}
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label={t("auth.username")}
          fullWidth
          margin="normal"
          defaultValue={profile.username}
          onChange={handleChange("username")}
        />

        <TextField
          label={t("auth.email")}
          fullWidth
          margin="normal"
          defaultValue={profile.email}
          onChange={handleChange("email")}
        />

        <TextField
          label={t("auth.firstName")}
          fullWidth
          margin="normal"
          defaultValue={profile.firstName}
          onChange={handleChange("firstName")}
        />

        <TextField
          label={t("auth.lastName")}
          fullWidth
          margin="normal"
          defaultValue={profile.lastName}
          onChange={handleChange("lastName")}
        />

        <TextField
          label={t("auth.currentPassword")}
          fullWidth
          margin="normal"
          type="password"
          onChange={handleChange("oldPassword")}
        />

        <TextField
          label={t("auth.newPassword")}
          fullWidth
          margin="normal"
          type="password"
          onChange={handleChange("newPassword")}
        />

        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 2 }}
          disabled={mutation.isPending}
        >
          {t("auth.saveChanges")}
        </Button>
      </form>
    </Box>
  );
};

export default ProfilePage;
