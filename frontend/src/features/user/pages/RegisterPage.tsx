import { useState, ChangeEvent, FormEvent } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { RegisterForm, RegisterResponse } from "../../../types/auth";
import { registerUser } from "../../../api/auth";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const Register: React.FC = () => {
  const [form, setForm] = useState<RegisterForm>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const mutation: UseMutationResult<
    RegisterResponse,
    Error,
    Omit<RegisterForm, "confirmPassword">
  > = useMutation({
    mutationFn: registerUser,
    onError: (err: Error) => {
      enqueueSnackbar(t("info.registerError") + err, { variant: "error" });
    },
    onSuccess: () => {
      enqueueSnackbar(t("info.registerSuccess"), { variant: "success" });
      navigate("/");
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prevForm) => ({ ...prevForm, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      enqueueSnackbar(t("auth.passwordsDoNotMatch"), { variant: "error" });
      return;
    }
    mutation.mutate({
      username: form.username,
      email: form.email,
      password: form.password,
      firstName: form.firstName,
      lastName: form.lastName,
    });
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2, textAlign: "center" }}
      >
        <Typography variant="h5" gutterBottom>
          {t("auth.register")}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label={t("auth.username")}
            name="username"
            value={form.username}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label={t("auth.firstName")}
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label={t("auth.lastName")}
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label={t("auth.email")}
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label={t("auth.password")}
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label={t("auth.confirmPassword")}
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={mutation.status === "pending"}
          >
            {t("auth.register")}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Register;
