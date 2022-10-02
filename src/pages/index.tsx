import * as React from "react";
import { Box, Button, Divider, Typography, styled } from "@mui/material";
import { NextSeo } from "next-seo";
import Image from "next/image";
import dynamic from "next/dynamic"

const Wave = styled("div")({
    "@keyframes wave": {
        "0%": {
            marginLeft: "0"
        },
        "100%": {
            marginLeft: "-1600px"
        }
    },
    "@keyframes swell": {
        "0%": {
            transform: "translate3d(0,-25px,0)"
        },
        "100%": {
            transform: "translate3d(0,-25px,0)"
        },
        "50%": {
            transform: "translate3d(0,5px,0)"
        }
    },
    background: "url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/85486/wave.svg)",
    backgroundRepeat: "repeat-x",
    position: "absolute",
    top: "-198px",
    width: "6400px",
    height: "198px",
    animation: "wave 7s cubic-bezier( 0.36, 0.45, 0.63, 0.53) infinite",
    transform: "translate3d(0, 0, 0)",
  });

const WavyLine = styled("div")({
    "@keyframes otherwave": {
        "0%": {
            backgroundPosition: "0 0"
        },
        "100%": {
            backgroundPosition: "300px 0"
        }
    },
    width: "600px",
	margin: "2rem auto",
	position: "relative",
	height: "35px",
    padding: "10px",
	background: "url('/images/wave.svg') repeat-x 0%",
	backgroundSize: "contain",
	animation: "30s otherwave linear infinite",
	
	"&::before": {
		background: "linear-gradient(90deg, rgba(white,0) 25%, rgba(white,1) 75%)",
		height: "100%",
		width: "100%",
		"@include": "absolute(0,0)"
	}
})

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
                            <Image width={"100%"} height={"100%"} alt="App Icon" src="/images/temp-logo.png" />
                        </Box>
                        <Typography variant="h2"><b>Anchor</b></Typography>
                    </Box>
                    <Divider />
                    {/* <Typography variant="subtitle1" color="textSecondary">Anchor your knowledge</Typography> */}
                </Box>

                <Typography variant="h2" color="textSecondary" sx={{
                    position: "absolute",
                    fontWeight: "bold",
                    top: "30%"
                }}>Anchor your knowledge</Typography>
                <WavyLine sx={{
                    position: "absolute",
                    top: "37%",
                    right: "50%",
                    transform: "translateX(50%)"
                }}/>

                <Box sx={{
                    height: "5%",
                    width:"100%",
                    position: "absolute",
                    bottom: "0",
                    left: "0",
                    background: "#015871"
                }}>
                    <Wave/>
                    <Wave sx={{
                        top: "-175px",
                        animation: "wave 7s cubic-bezier( 0.36, 0.45, 0.63, 0.53) -.125s infinite, swell 7s ease -1.25s infinite",
                        opacity: "1"
                    }}/>
                </Box>
                <Box sx={{}}></Box>
            </Box>
        </React.Fragment>
    );
}

export default HomePage;
