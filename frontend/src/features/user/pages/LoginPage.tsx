import { useState, ChangeEvent, FormEvent } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { LoginForm, LoginResponse } from "../../../types/auth";
import { loginUser } from "../../../api/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/authContext";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";

const Login: React.FC = () => {
  const [form, setForm] = useState<LoginForm>({
    username: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const { login } = useAuth();
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const mutation: UseMutationResult<LoginResponse, Error, LoginForm> =
    useMutation({
      mutationFn: loginUser,
      onError: (error: Error) => {
        enqueueSnackbar(t("info.loginError"), { variant: "error" });
        console.error(error);
      },
      onSuccess: (response: LoginResponse) => {
        enqueueSnackbar(t("info.loginSuccess"), { variant: "success" });
        login(response);
        navigate("/");
      },
    });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    mutation.mutate(form);
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2, textAlign: "center" }}
      >
        <Typography variant="h5" gutterBottom>
          {t("auth.logIn")}
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
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
            label={t("auth.password")}
            type="password"
            name="password"
            value={form.password}
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
            {mutation.status === "pending"
              ? t("auth.loggingIn")
              : t("auth.logIn")}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
