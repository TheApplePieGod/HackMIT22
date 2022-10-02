import * as React from "react";
import { Box, Button, Typography, IconButton } from "@mui/material";
import Resizer from "react-image-file-resizer";
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {
    initialSource?: string;
    uploadCallback?: (source: Blob, width: number, height: number) => void;
    clearCallback?: () => void;
    title: string;
    disabled?: boolean;
}

export const ImageUploader: React.FunctionComponent<Props> = (props) => {
    const uploadedImage = React.useRef<HTMLImageElement>(null);
    const fileInput = React.useRef<HTMLInputElement>(null);
    const [uploaded, setUploaded] = React.useState(false);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.item(0);
        if (!file) return;

        const { current } = uploadedImage;
        if (!current) return;

        // We need to load the image first to understand what dimensions
        // it has before we can compress it
        const fileReader = new FileReader();
        fileReader.onload = () => {
            const img = new Image();

            img.onload = () => {
                Resizer.imageFileResizer(
                    file,
                    img.width,
                    img.height,
                    "jpg",
                    50,
                    0,
                    (uri) => {
                        // Just set the preview image to the non-compressed image because it should
                        // look essentially the same (so we don't have to convert back to a base64 string)
                        current.src = img.src;
                        setUploaded(true);
                        if (props.uploadCallback)
                            props.uploadCallback(uri as Blob, img.width, img.height);
                    },
                    "blob"
                );
            };

            img.src = fileReader.result?.toString() ?? "";
        };

        fileReader.readAsDataURL(file);
    };

    const clearCurrentImage = () => {
        const { current } = uploadedImage;
        if (current) current.src = "";
        setUploaded(false);
        if (props.clearCallback) props.clearCallback();
    };

    React.useEffect(() => {
        const { current } = uploadedImage;
        if (props.initialSource && current) {
            current.src = props.initialSource;
            setUploaded(true);
        } else setUploaded(false);
    }, [props.initialSource]);

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "2rem"
            }}
        >
            {uploaded ? (
                <IconButton
                    onClick={clearCurrentImage}
                    disabled={props.disabled}
                >
                    <DeleteIcon />
                </IconButton>
            ) : (
                <Typography variant="h6">{props.title}</Typography>
            )}
            <Button
                onClick={() => {
                    if (fileInput.current) fileInput.current.click();
                }}
                disabled={props.disabled}
                sx={{ border: "dashed 2px #000" }}
            >
                <img
                    alt=""
                    ref={uploadedImage}
                    width={"auto"}
                    height={"auto"}
                    style={{ maxWidth: "50vw", maxHeight: "30vh" }}
                />
                <br />
                <input
                    ref={fileInput}
                    style={{ display: "none" }}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                />
                {!uploaded && <Typography variant="h3" color="textPrimary">+</Typography>}
            </Button>
        </Box>
    );
};
