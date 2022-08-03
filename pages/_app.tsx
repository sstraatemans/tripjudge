import type { AppProps } from "next/app";
import Head from "next/head";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/router";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { UserProvider } from "../src/context/UserContext";
import cookies from "js-cookie";

const theme = createTheme({});

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <UserProvider>
      <ThemeProvider theme={theme}>
        <Head>
          <title>Trip judge</title>
        </Head>

        <Grid container spacing={2}>
          <Grid item xs={0} md={2}></Grid>
          <Grid item xs={12} md={8}>
            <header>
              <h1>Trip Judge</h1>
            </header>
          </Grid>
          <Grid item xs={0} md={2}></Grid>
        </Grid>

        <Component {...pageProps} />
      </ThemeProvider>
    </UserProvider>
  );
}

export default MyApp;