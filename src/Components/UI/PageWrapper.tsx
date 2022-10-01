import * as React from "react";
import { styled, Box } from "@mui/material";

interface Props
{
    children?: React.ReactElement
}

export const PageWrapper: React.FunctionComponent<Props> = (props) => {
    return (
        <Box>
            {props.children}
        </Box>
    );
}