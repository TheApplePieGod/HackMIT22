import * as React from "react";
import { styled, Box, Button, Paper, Typography, Divider, IconButton, TextField, InputAdornment } from "@mui/material";
import TimelineIcon from '@mui/icons-material/Timeline';
import DescriptionIcon from '@mui/icons-material/Description';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from "next/router";
import { AddNoteDialog } from "src/Components/UI/AddNoteDialog";
import { NextSeo } from "next-seo";
import dynamic from "next/dynamic";
import { Transition } from 'react-transition-group';

const NoteForceGraph = dynamic(() => import("../../Components/UI/NoteForceGraph"), {ssr: false});

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
    const [notesFilter, setNotesFilter] = React.useState("");
    const [addDialogOpen, setAddDialogOpen] = React.useState(false);
    const [editingNodeId, setEditingNoteId] = React.useState("");

    const { classId } = router.query;

    const reloadData = () => {
        fetch(
            `/api/getNotes/${classId}`,
            { method: "GET" }
        ).then(async (res) => {
            if (!res.ok) return;
            const data = await res.json();
            setClassData(data);
        });
    }

    React.useEffect(() => {
        if (!router.isReady) return;
        reloadData();
    }, [router]);

    const findNoteById = (id: string) =>
        classData?.notes.find(n => n._id == id);

    const displayNote = (id: string) => {
        setViewMode(ViewMode.Notes);
        setSelectedNote(id);
    }

    const renderGifs = () => {
        const result: JSX.Element[] = [];
        const note = findNoteById(selectedNote);
        if (!note) return result;
        
        note.manims.forEach((m, i) => {
            const widthRatio = m.dim[0] / note.dim[0];
            const heightRatio = m.dim[1] / note.dim[1];
            const posRatioX = m.pos[0] / note.dim[0];
            const posRatioY = m.pos[1] / note.dim[1];
            
            result.push(
                <img src={m.img} key={`${note._id}_g${i}`} style={{
                    position: "absolute",
                    width: `${widthRatio*100}%`,
                    height: `${heightRatio*100}%`,
                    top: `${posRatioY*100}%`,
                    left: `${posRatioX*100}%`
                }} />
            )
        });

        return result;
    }

    const duration = 300;

    const defaultStyle = {
        transition: `opacity ${duration}ms ease-in-out`,
        opacity: 0,
    }

    const transitionStyles: any = {
        entering: { opacity: 0 },
        entered:  { opacity: 1 },
        exiting:  { opacity: 1 },
        exited:  { opacity: 0 },
    };

    const transitionStyles2: any = {
        entering: { opacity: 1 },
        entered:  { opacity: 0 },
        exiting:  { opacity: 0 },
        exited:  { opacity: 1 },
    };

    const transitionRef = React.useRef<HTMLDivElement>();

    return (
        <Box>
            <NextSeo
                title={`${classData?.course.title ?? "Class"}`}
                openGraph={{
                    title: `${classData?.course.title ?? "Class"}`
                }}
            />
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
                <TextField
                    placeholder="Filter"
                    value={notesFilter}
                    onChange={e => setNotesFilter((e.target.value as string))}
                    sx={{
                        marginBottom: "0.5rem",
                        "& .MuiFilledInput-root": {
                            height: "50px",
                            paddingBottom: "15px"
                        }
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                    variant="filled"
                  />
                {classData ?
                    <Box sx={{ maxHeight: "100%", overflowY: "auto", overflowX: "hidden", display: "flex", flexDirection: "column", gap: "5px", paddingBottom: "10px" }}>
                        <Paper elevation={3}
                            onClick={() => {
                                setAddDialogOpen(true);
                                setEditingNoteId("");
                            }}
                            sx={{
                                backgroundColor: "#46ba56",
                                display: "flex",
                                alignItems: "center",
                                width: "100%",
                                padding: "10px",
                                cursor: "pointer"
                            }}
                        >
                            <Typography>+ Create</Typography>
                        </Paper>
                        {
                            [...classData.notes.filter(n => n.title.toLowerCase().startsWith(notesFilter.toLowerCase()))].sort((a, b) => a.title.localeCompare(b.title)).map((n, i) => (
                                <Paper elevation={3} key={i} 
                                    onClick={() => setSelectedNote(n._id)}
                                    onDoubleClick={() => {
                                        setEditingNoteId(n._id);
                                        setAddDialogOpen(true);
                                    }}
                                    sx={{
                                        backgroundColor: selectedNote == n._id ? "secondary.main" : "paper.main",
                                        transition: "background-color 100ms ease-in-out",
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
                                    <Typography sx={{ wordWrap: "break-word" }}>{n.title}</Typography>
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
                    <Transition in={viewMode == ViewMode.Graph2D} timeout={0}>
                    {state => (
                        <div style={{
                        ...defaultStyle,
                        ...transitionStyles2[state]
                        }}>
                            <Paper elevation={5} sx={{
                                maxHeight: "calc(100vh - 80px)",
                                overflow: "auto",
                                margin: "40px",
                                padding: "10px",
                                textAlign: "center",
                                position: "relative"
                            }}>
                                {selectedNote != "" ?
                                    <React.Fragment>
                                        <Box sx={{ position: "relative" }}>
                                            <img src={findNoteById(selectedNote)?.img} style={{
                                                width: "100%",
                                            }} />
                                            {renderGifs()}
                                        </Box>
                                    </React.Fragment>
                                    : <Typography variant="h3">No Note Selected</Typography>
                                }
                            </Paper>
                        </div>
                    )}
                    </Transition>
                </Box>
                <Box sx={{
                    display: viewMode == ViewMode.Graph2D ? "" : "none",
                }}>
                    {classData && 
                        <Transition in={viewMode == ViewMode.Graph2D} timeout={0}>
                        {state => (
                            <div style={{
                            ...defaultStyle,
                            ...transitionStyles[state]
                            }}>
                                <NoteForceGraph notes={classData.notes} displayNote={displayNote}/>
                            </div>
                        )}
                        </Transition>
                    }
                </Box>
            </Box>
            <AddNoteDialog
                open={addDialogOpen}
                onClose={() => setAddDialogOpen(false)}
                courseId={classId as string}
                notes={classData?.notes ?? []}
                editingNoteId={editingNodeId}
                reloadData={reloadData}
            />
        </Box>
    );
}

export default ClassPage;