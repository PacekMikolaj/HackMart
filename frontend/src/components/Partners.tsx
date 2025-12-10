import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPartners } from "../api/partners";
import {
  Grid,
  Typography,
  CircularProgress,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Container,
} from "@mui/material";
import { Partner } from "../types/partner";
import { BASE_URL } from "../../config";
import { useTranslation } from "react-i18next";

const Partners: React.FC = () => {
  const { data, isLoading, isError } = useQuery<Partner[]>({
    queryKey: ["partners"],
    queryFn: fetchPartners,
  });
  const { t } = useTranslation();

  if (isLoading) return <CircularProgress />;
  if (isError)
    return <Typography color="error">Błąd ładowania partnerów.</Typography>;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        {t("product.partners")}
      </Typography>
      <Grid container spacing={3}>
        {data?.map((partner) => (
          <Grid item xs={12} sm={6} md={4} key={partner.id}>
            <Card>
              <CardActionArea
                component="a"
                href={partner.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={`${BASE_URL}/fetch?url=${encodeURIComponent(
                    partner.logoUrl
                  )}`}
                  alt={partner.name}
                />
                <CardContent>
                  <Typography variant="subtitle1" align="center">
                    {partner.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Partners;
