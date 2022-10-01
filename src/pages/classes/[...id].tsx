import * as React from "react";
import { styled, Box, Button, Paper, Typography, Divider } from "@mui/material";

const TEST_NOTES: Note[] = [
    {
        id: "0",
        title: "Note1",
        author: "Jimmy",
        img: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.clipartbest.com%2Fcliparts%2FRiG%2FRad%2FRiGRadBxT.png&f=1&nofb=1&ipt=cd4b3afe960c63039c31e19a9d149d4b2693e33d69acbfdf4b439019d96615c7&ipo=images",
        class: "Class1",
        score: 0,
        children: []
    },
    {
        id: "0",
        title: "Note1",
        author: "Jimmy",
        img: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.clipartbest.com%2Fcliparts%2FRiG%2FRad%2FRiGRadBxT.png&f=1&nofb=1&ipt=cd4b3afe960c63039c31e19a9d149d4b2693e33d69acbfdf4b439019d96615c7&ipo=images",
        class: "Class1",
        score: 0,
        children: []
    },
    {
        id: "0",
        title: "Note1",
        author: "Jimmy",
        img: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.clipartbest.com%2Fcliparts%2FRiG%2FRad%2FRiGRadBxT.png&f=1&nofb=1&ipt=cd4b3afe960c63039c31e19a9d149d4b2693e33d69acbfdf4b439019d96615c7&ipo=images",
        class: "Class1",
        score: 0,
        children: []
    },
    {
        id: "0",
        title: "Note1",
        author: "Jimmy",
        img: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.clipartbest.com%2Fcliparts%2FRiG%2FRad%2FRiGRadBxT.png&f=1&nofb=1&ipt=cd4b3afe960c63039c31e19a9d149d4b2693e33d69acbfdf4b439019d96615c7&ipo=images",
        class: "Class1",
        score: 0,
        children: []
    },
    {
        id: "0",
        title: "Note1",
        author: "Jimmy",
        img: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.clipartbest.com%2Fcliparts%2FRiG%2FRad%2FRiGRadBxT.png&f=1&nofb=1&ipt=cd4b3afe960c63039c31e19a9d149d4b2693e33d69acbfdf4b439019d96615c7&ipo=images",
        class: "Class1",
        score: 0,
        children: []
    }
];

const SIDEBAR_WIDTH = 200;
const TOPBAR_HEIGHT = 50;

const ClassPage: React.FunctionComponent = () => {
    return (
        <Box>
            <Paper square elevation={3} sx={{
                width: SIDEBAR_WIDTH,
                height: "100vh",
                position: "fixed",
                padding: "5px",
                top: 0,
                left: 0,
                backgroundColor: "primary.main"
            }}>
                <Box sx={{ maxHeight: "100%", overflowY: "auto", display: "flex", flexDirection: "column", gap: "5px" }}>
                    {
                        TEST_NOTES.map((n, i) => (
                            <Paper elevation={3} key={i} 
                                onClick={() => console.log("note clicked")}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    textAlign: "left",
                                    width: "100%",
                                    padding: "10px",
                                    gap: "30px",
                                    cursor: "pointer"
                                }}
                            >
                                <Typography>{n.title}</Typography>
                                <Typography color="textSecondary">{n.author}</Typography>
                            </Paper>
                        ))
                    }
                </Box>
            </Paper>
            <Paper square elevation={3} sx={{
                width: "100vw",
                height: TOPBAR_HEIGHT,
                position: "fixed",
                zIndex: 2,
                top: 0,
                left: 0,
                backgroundColor: "primary.main",
                display: "flex",
                alignItems: "center",
                paddingLeft: "5px"
            }}>
                <Typography>Class Name</Typography>
            </Paper>
        </Box>
    );
}

export default ClassPage;