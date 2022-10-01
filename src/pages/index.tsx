import * as React from "react";
import { Box, Button, Divider, Typography } from "@mui/material";
import { NextSeo } from "next-seo";
import Image from "next/image";

const HomePage = () => {
    return (
        <React.Fragment>
            <NextSeo
                title="Home"
                openGraph={{
                    title: "Home"
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
                    marginTop: "2rem"
                }}
            >
                <Box sx={{ width: "fit-content" }}>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center"
                        }}
                    >
                        <Box
                            sx={{
                                width: { xs: 40, md: 45, lg: 50 },
                                marginRight: "1rem"
                            }}
                        >
                            <Image width={"100%"} height={"100%"} alt="App Icon" src="/favicon.ico" />
                        </Box>
                        <Typography variant="h2"><b>App</b></Typography>
                    </Box>
                    <Divider />
                </Box>
            </Box>
        </React.Fragment>
    );
}

export default HomePage;
