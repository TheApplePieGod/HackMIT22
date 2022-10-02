import * as React from "react";
import { styled, Box, Button } from "@mui/material";
import { useRouter } from "next/router";

interface Props {
    children?: React.ReactElement
}

export const PageWrapper: React.FunctionComponent<Props> = (props) => {
    const router = useRouter();

    return (
        <Box>
            <Box sx={{
                position: "fixed",
                top: 0,
                width: "100vw",
                padding: "10px",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                zIndex: 2,
                pointerEvents: "none"
            }}>
                {router.asPath == "/" &&
                    <Button onClick={() => router.push("/classes")} variant="contained">Login</Button>
                }
                {router.asPath != "/" &&
                    <Button sx={{ pointerEvents: "all" }} onClick={() => router.push("/")} variant="contained">Home</Button>
                }
            </Box>
            <Box>
                {props.children}
            </Box>
        </Box>
    );
}