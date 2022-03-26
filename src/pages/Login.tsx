import { Button, Grid, Typography } from "@mui/material";
import { Location, Navigate, useLocation, useNavigate } from "react-router-dom";

import { EMAIL_DOMAIN } from "../config";
import useAuth from "../helpers/auth";

export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: Location })?.from?.pathname || "/";

  const signin = async () => {
    await login();
    navigate(from, { replace: true });
  };

  if (user === null) {
    return (
      <Grid
        container
        sx={{
          alignItems: "center",
          mt: "10%",
        }}
      >
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography variant="h6" gutterBottom paragraph textAlign="center">
            You can only use @{EMAIL_DOMAIN} emails. Otherwise you will be
            logged out!
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button onClick={signin}>
            <img
              src="/assets/btn_google_signin_dark_normal_web.png"
              alt="Google login"
            />
          </Button>
        </Grid>
      </Grid>
    );
  }

  return <Navigate to={from} replace />;
}
