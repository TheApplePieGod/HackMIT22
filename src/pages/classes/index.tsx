import * as React from "react";
import { Box, Button, Divider, IconButton, Paper, Typography } from "@mui/material";
import { NextSeo } from "next-seo";
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from "next/router";

const TEST_CLASSES = [
    { id: "12345", title: "Class1 ajslkfj slfjlj lsj j", instructor: "Dr. Demon" },
    { id: "34322", title: "Class Demon", instructor: "Dr. Demon" }
];

const ClassesPage = () => {
    const router = useRouter();
    
    return (
        <React.Fragment>
            <NextSeo
                title="Classes"
                openGraph={{
                    title: "Classes"
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
                    marginTop: "6rem"
                }}
            >
                <Box sx={{ width: "fit-content" }}>
                    <Typography variant="h3"><b>Your Courses</b></Typography>
                    <Divider />
                    <Box sx={{ marginTop: "1rem", gap: "10px", display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                        {
                            TEST_CLASSES.map((c, i) => (
                                <Box sx={{ display: "flex", alignItems: "center", width: "100%", gap: "0.5rem" }}>
                                    <Paper key={i} 
                                        onClick={() => router.push(`/classes/${c.id}`)}
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
                                        <Typography>{c.title}</Typography>
                                        <Typography color="textSecondary">{c.instructor}</Typography>
                                    </Paper>
                                    <IconButton sx={{ padding: "0.25rem" }}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            ))
                        } 
                    </Box>
                </Box>
            </Box>
        </React.Fragment>
    );
}

export default ClassesPage;