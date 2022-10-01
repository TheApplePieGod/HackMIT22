import * as React from "react";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "../Components/Hooks/CreateEmotionCache";
import { Box, CircularProgress } from "@mui/material";
import { createAppTheme } from "../Styles/AppTheme";
import { PageWrapper } from "../Components/UI/PageWrapper";
import { DefaultSeo } from "next-seo";
import { useAppDispatch } from "../Redux/Hooks";
import SeoConfig from "../Definitions/SeoConfig";
import { reduxWrapper } from "../Redux/Store";
import App from "next/app";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

// TODO: types for these things?
// https://github.com/mui/material-ui/blob/master/examples/nextjs/pages/_app.js
const CustomApp = (props: any) => {
    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

    return (
        <CacheProvider value={emotionCache}>
            <Head>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
                />
            </Head>
            <DefaultSeo {...SeoConfig} />
            <ThemeProvider theme={createAppTheme()}>
                <CssBaseline />
                <PageWrapper>
                    <Box>
                        <Component {...pageProps} />
                    </Box>
                </PageWrapper>
            </ThemeProvider>
        </CacheProvider>
    );
}

export default reduxWrapper.withRedux(CustomApp);