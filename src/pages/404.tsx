import * as React from "react";
import { Box, Divider, Typography } from "@mui/material";
import { NextSeo } from "next-seo";

const NotFoundPage = () => {
    return (
        <React.Fragment>
            <NextSeo
                title="404"
                openGraph={{
                    title: "Page Not Found"
                }}
            />
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    gap: "1rem",
                    marginTop: "4rem"
                }}
            >
                <Box sx={{ width: "fit-content" }}>
                    <Typography variant="h2">404</Typography>
                    <Divider />
                </Box>
                <Typography variant="subtitle1">Cannot find the page you are looking for.</Typography>
            </Box>
        </React.Fragment>
    );
}

export default NotFoundPage;