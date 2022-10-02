import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, OutlinedInput, Select, TextField } from "@mui/material";
import * as React from "react"
import { ImageUploader } from "./ImageUploader";

interface Props {
    open: boolean;
    onClose: () => void;
    courseId: string;
    notes: Note[];
    edit: boolean;
}

export const AddNoteDialog: React.FunctionComponent<Props> = (props) => {
    const [title, setTitle] = React.useState("");
    const [image, setImage] = React.useState<number[] | undefined>(undefined);    
    const [imageDims, setImageDims] = React.useState<number[]>([]);
    const [links, setLinks] = React.useState<string[]>([]);

    // https://stackoverflow.com/questions/105034/how-do-i-create-a-guid-uuid
    const uuid = () => {
        return Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15);
    }

    // https://stackoverflow.com/questions/24761778/javascript-encode-byte-array-to-base64
    const b64encode = (x: number[]) => { 
        return btoa(x.map((v) => {return String.fromCharCode(v)}).join(''))
    };

    const findNoteById = (id: string) =>
        props.notes.find(n => n._id == id);

    const onSave = () => {
        fetch(
            "/api/createNote",
            { method: "POST", body: JSON.stringify({
                _id: uuid(),
                title: title,
                author: "Evan",
                img: b64encode(image ?? []),
                dim: imageDims,
                course: props.courseId,
                score: 0,
                children: links
            })}
        ).then(res => {
            if (res.ok) {
                props.onClose();
            }
        })
    }

    const onClose = () => {
        props.onClose();
        setTitle("");
        setImage(undefined);
        setLinks([]);
    }

    return (
        <Dialog open={props.open} onClose={props.onClose} fullWidth maxWidth={'lg'}>
            <DialogTitle>Create Note</DialogTitle>
            <DialogContent>
                <ImageUploader
                    title="Upload An Image"
                    uploadCallback={async (src, width, height) => {
                        setImage(Array.from(
                            new Uint8Array(await src.arrayBuffer())
                        ));
                        setImageDims([ width, height ]);
                    }}
                    clearCallback={() => setImage(undefined)}
                />
                <TextField
                    label="Title"
                    value={title}
                    onChange={e => setTitle(e.target.value as string)}
                    variant="outlined"
                    sx={{ width: "100%", marginTop: "1rem" }}
                />
                <FormControl sx={{ width: "100%", marginTop: "1rem" }}>
                    <InputLabel id="links-label">Links</InputLabel>
                    <Select
                        labelId="links-label"
                        multiple
                        value={links}
                        onChange={(e) => setLinks(typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value)}
                        input={<OutlinedInput label="Links" />}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={findNoteById(value)?.title ?? ""} />
                            ))}
                            </Box>
                        )}
                        //MenuProps={MenuProps}
                    >
                        {props.notes.map((note) => (
                            <MenuItem
                                key={note._id}
                                value={note._id}
                                //style={getStyles(name, personName, theme)}
                            >
                                {note.title}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose} color="secondary">
                    Cancel
                </Button>
                <Button disabled={image === undefined || title === ""} onClick={onSave} color="primary">
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    );
}