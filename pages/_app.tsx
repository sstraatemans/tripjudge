import type { AppProps } from "next/app";
import Head from "next/head";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { UserProvider } from "../src/hooks/useAuthUser";
import { Typography, Grid } from "@mui/material";

const theme = createTheme({});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <ThemeProvider theme={theme}>
        <Head>
          <title>Trip judge</title>
        </Head>

        <Grid container spacing={2}>
          <Grid item xs={0} md={2}></Grid>
          <Grid item xs={12} md={8} style={{ textAlign: "center" }}>
            <header>
              <Typography variant="h1">Trip Judge</Typography>
            </header>

            <Component {...pageProps} />
          </Grid>
          <Grid item xs={0} md={2}></Grid>
        </Grid>
      </ThemeProvider>
    </UserProvider>
  );
}

export default MyApp;
