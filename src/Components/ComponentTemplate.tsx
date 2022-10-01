import * as React from "react";
import { styled, Box } from "@mui/material";

interface Props {

}

const _ComponentTemplate: React.FunctionComponent<Props> = (props) => {
    return (
        <Box>
            
        </Box>
    );
}

// Consider wrapping in React.memo() if appropriate (https://dmitripavlutin.com/use-react-memo-wisely/)
// export const ComponentTemplate = React.memo(_ComponentTemplate);
export const ComponentTemplate = _ComponentTemplate;