import * as React from "react";
import { styled, Box, Button, Paper, Typography, Divider, IconButton } from "@mui/material";
import TimelineIcon from '@mui/icons-material/Timeline';
import DescriptionIcon from '@mui/icons-material/Description';
import { useRouter } from "next/router";

enum ViewMode {
    Notes = 0,
    Graph2D
}

const SIDEBAR_WIDTH = 250;
const TEST_NOTES = [];

const ClassPage: React.FunctionComponent = () => {
    const router = useRouter();

    const [classData, setClassData] = React.useState<{ course: Course; notes: Note[] } | undefined>(undefined);
    const [viewMode, setViewMode] = React.useState(ViewMode.Graph2D);
    const [selectedNote, setSelectedNote] = React.useState("");

    const { classId } = router.query;

    React.useEffect(() => {
        if (!router.isReady) return;
        
        fetch(
            `/api/getNotes/${classId}`,
            { method: "GET" }
        ).then(async (res) => {
            if (!res.ok) return;
            const data = await res.json();
            console.log(data);
            setClassData(data);
        });
    }, [router]);

    const findNoteById = (id: string) =>
        classData?.notes.find(n => n._id == id);

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
                <Typography>{classData?.course.title ?? "Loading..."}</Typography>
                <Typography color="textSecondary">{classData?.course.instructor}</Typography>
                <Divider sx={{ margin: "0.25rem 0 0.5rem 0" }} />
                {classData ?
                    <Box sx={{ maxHeight: "100%", overflowY: "auto", display: "flex", flexDirection: "column", gap: "5px", paddingBottom: "10px" }}>
                        {
                            classData.notes.map((n, i) => (
                                <Paper elevation={3} key={i} 
                                    onClick={() => setSelectedNote(n._id)}
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
                    : <Typography>Loading...</Typography>
                }
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
                    <Paper elevation={5} sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "calc(100% - 80px)",
                        margin: "40px",
                        padding: "10px",
                        textAlign: "center",
                        overflow: "auto",
                        position: "relative"
                    }}>
                        {selectedNote != "" ?
                            <img src={findNoteById(selectedNote)?.img} style={{ width: "100%", position: "absolute", top: 0 }} />
                            : <Typography variant="h3">No Note Selected</Typography>
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