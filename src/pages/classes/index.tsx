import * as React from "react";
import { Box, Button, Divider, IconButton, Paper, Typography } from "@mui/material";
import { NextSeo } from "next-seo";
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from "next/router";

const ClassesPage = () => {
    const router = useRouter();
    const [courses, setCourses] = React.useState<Course[] | undefined>(undefined);
    
    React.useEffect(() => {
        fetch(
            `/api/getCourses`,
            { method: "GET" }
        ).then(async (res) => {
            if (!res.ok) return;
            const data = await res.json();
            setCourses(data);
        });
    }, []);

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
                    {courses ?
                        <Box sx={{ marginTop: "1rem", gap: "10px", display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                            {
                                courses.map((c, i) => (
                                    <Box sx={{ display: "flex", alignItems: "center", width: "100%", gap: "0.5rem" }}>
                                        <Paper elevation={3} key={i} 
                                            onClick={() => router.push(`/classes/${c._id}`)}
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
                        : <Typography>Loading...</Typography>
                    }
                </Box>
            </Box>
        </React.Fragment>
    );
}

export default ClassesPage;