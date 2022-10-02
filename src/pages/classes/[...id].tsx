import * as React from "react";
import { styled, Box, Button, Paper, Typography, Divider, IconButton } from "@mui/material";
import TimelineIcon from '@mui/icons-material/Timeline';
import DescriptionIcon from '@mui/icons-material/Description';

enum ViewMode {
    Notes = 0,
    Graph2D
}

const TEST_NOTES: Note[] = [
    {
        _id: "0",
        title: "Note1",
        author: "Jimmy",
        img: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.clipartbest.com%2Fcliparts%2FRiG%2FRad%2FRiGRadBxT.png&f=1&nofb=1&ipt=cd4b3afe960c63039c31e19a9d149d4b2693e33d69acbfdf4b439019d96615c7&ipo=images",
        class: "Class1",
        score: 0,
        children: []
    },
    {
        _id: "0",
        title: "Note1",
        author: "Jimmy",
        img: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.clipartbest.com%2Fcliparts%2FRiG%2FRad%2FRiGRadBxT.png&f=1&nofb=1&ipt=cd4b3afe960c63039c31e19a9d149d4b2693e33d69acbfdf4b439019d96615c7&ipo=images",
        class: "Class1",
        score: 0,
        children: []
    },
    {
        _id: "0",
        title: "Note1",
        author: "Jimmy",
        img: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.clipartbest.com%2Fcliparts%2FRiG%2FRad%2FRiGRadBxT.png&f=1&nofb=1&ipt=cd4b3afe960c63039c31e19a9d149d4b2693e33d69acbfdf4b439019d96615c7&ipo=images",
        class: "Class1",
        score: 0,
        children: []
    },
    {
        _id: "0",
        title: "Note1",
        author: "Jimmy",
        img: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.clipartbest.com%2Fcliparts%2FRiG%2FRad%2FRiGRadBxT.png&f=1&nofb=1&ipt=cd4b3afe960c63039c31e19a9d149d4b2693e33d69acbfdf4b439019d96615c7&ipo=images",
        class: "Class1",
        score: 0,
        children: []
    },
    {
        _id: "0",
        title: "Note1",
        author: "Jimmy",
        img: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.clipartbest.com%2Fcliparts%2FRiG%2FRad%2FRiGRadBxT.png&f=1&nofb=1&ipt=cd4b3afe960c63039c31e19a9d149d4b2693e33d69acbfdf4b439019d96615c7&ipo=images",
        class: "Class1",
        score: 0,
        children: []
    }
];

const SIDEBAR_WIDTH = 200;

const ClassPage: React.FunctionComponent = () => {
    const [viewMode, setViewMode] = React.useState(ViewMode.Graph2D);
    const [selectedNote, setSelectedNote] = React.useState("");

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
                <Typography>{"Class Name"}</Typography>
                <Typography color="textSecondary">{"Instructor"}</Typography>
                <Divider sx={{ margin: "0.25rem 0 0.5rem 0" }} />
                <Box sx={{ maxHeight: "100%", overflowY: "auto", display: "flex", flexDirection: "column", gap: "5px", paddingBottom: "10px" }}>
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
            <Box sx={{ position: "fixed", left: SIDEBAR_WIDTH, height: "100vh", width: `calc(100vw - ${SIDEBAR_WIDTH}px)`}}>
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    position: "absolute",
                    top: 10, left: 10,
                    border: "1px solid black",
                    borderRadius: "15px",
                    padding: "4px",
                    gap: "0.25rem",
                    zIndex: 2,
                    backgroundColor: "#83a0bf50"
                }}>
                    <IconButton onClick={() => setViewMode(ViewMode.Notes)} sx={{ padding: "0.25rem" }}>
                        <DescriptionIcon sx={{ color: "text.primary" }} />
                    </IconButton>
                    <Box sx={{ width: "2px", height: "20px", backgroundColor: "black" }} />
                    <IconButton onClick={() => setViewMode(ViewMode.Graph2D)} sx={{ padding: "0.25rem" }}>
                        <TimelineIcon sx={{ color: "text.primary" }} />
                    </IconButton>
                </Box>
                <Box sx={{
                    display: viewMode == ViewMode.Notes ? "" : "none",
                    width: "100%",
                    height: "100%"
                }}>
                    <Paper sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "calc(100% - 80px)",
                        margin: "40px",
                        padding: "10px",
                        textAlign: "center"
                    }}>
                        {selectedNote == "" &&
                            <Typography variant="h3">No Note Selected</Typography>
                        }
                    </Paper>
                </Box>
                <Box sx={{
                    display: viewMode == ViewMode.Graph2D ? "" : "none"
                }}>
                    Graph
                </Box>
            </Box>
        </Box>
    );
}

export default ClassPage;