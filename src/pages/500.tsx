import * as React from "react";
import { Box, Divider, Typography } from "@mui/material";
import { NextSeo } from "next-seo";

const ErrorPage = () => {
    return (
        <React.Fragment>
            <NextSeo
                title="500"
                openGraph={{
                    title: "Server Error"
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
                    <Typography variant="h2">500</Typography>
                    <Divider />
                </Box>
                <Typography variant="subtitle1">An internal server error has occured.</Typography>
            </Box>
        </React.Fragment>
    );
}

export default ErrorPage;