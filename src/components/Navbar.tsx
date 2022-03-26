import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import useAuth from "../helpers/auth";
import Logo from "../logo.svg?component";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box component="div" sx={{ flexGrow: 1 }}>
            <Button to="/" component={RouterLink}>
              <Logo height="50px" width="50px" />
            </Button>
          </Box>

          {user !== null && (
            <>
              <Typography variant="body2">{user.email}</Typography>
              <Button color="inherit" onClick={logout}>
                Logout
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
