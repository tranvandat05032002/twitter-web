import { Box, Button, DialogActions, DialogContent, Slider, Typography } from "@mui/material";
import { Cancel } from '@mui/icons-material';
import CropIcon from '@mui/icons-material/Crop';
import Cropper from 'react-easy-crop';
import getCroppedImg from "@/utils/cropImage";
import React from "react";
import { ICropImage, ICroppedPixels } from "@/types/imageTypes";
import { apiInstance } from "@/utils/api";
interface ICropEasy {
    photoURL: any;
    setOpenCrop: any;
    setPhotoURL: any;
    setFile: any
}
const CropEasy = ({ photoURL, setOpenCrop, setPhotoURL, setFile }: ICropEasy) => {
    // const { setAlert, setLoading } = useAuth();
    const [crop, setCrop] = React.useState({ x: 0, y: 0 });
    const [zoom, setZoom] = React.useState(1);
    const [rotation, setRotation] = React.useState<number | 0>(0);
    const [croppedAreaPixels, setCroppedAreaPixels] = React.useState<ICroppedPixels | null>(null);

    const cropComplete = (croppedArea: any, croppedAreaPixels: ICroppedPixels) => {
        console.log("croppedAreaPixels: ", croppedAreaPixels)
        setCroppedAreaPixels(croppedAreaPixels);
    };

    const cropImage = async () => {
        // setLoading(true);
        try {
            // const {access_token} = getToken()
            const { file, url } = await getCroppedImg(
                photoURL,
                croppedAreaPixels,
                rotation
            ) as ICropImage;
            // const formData = new FormData();
            // formData.append("image", file);

            // const response = await apiInstance.post(
            //     "/medias/upload-image",
            //     formData, 
            //     {
            //         headers: {
            //           "Content-Type": "multipart/form-data",
            //           Authorization: `Bearer ${access_token}`,
            //         },
            //     }
            //   );
            // console.log("response: ", response)
            setPhotoURL(url);
            setFile(file);
            setOpenCrop(false);
        } catch (error) {
            // setAlert({
            //     isAlert: true,
            //     severity: 'error',
            //     message: error.message,
            //     timeout: 5000,
            //     location: 'modal',
            // });
            throw (error)
            console.log(error);
        }

        // setLoading(false);
    };
    return (
        <>
            <DialogContent
                dividers
                sx={{
                    background: '#333',
                    position: 'relative',
                    height: 400,
                    width: 'auto',
                    minWidth: { sm: 500 },
                }}
            >
                <Cropper
                    image={photoURL}
                    crop={crop}
                    zoom={zoom}
                    rotation={rotation}
                    aspect={1}
                    onZoomChange={setZoom}
                    onRotationChange={setRotation}
                    onCropChange={setCrop}
                    onCropComplete={cropComplete}
                />
            </DialogContent>
            <DialogActions sx={{ flexDirection: 'column', mx: 3, my: 2 }}>
                <Box sx={{ width: '100%', mb: 1 }}>
                    <Box>
                        <Typography>Zoom: {zoomPercent(zoom)}</Typography>
                        <Slider
                            valueLabelDisplay="auto"
                            valueLabelFormat={zoomPercent}
                            min={1}
                            max={3}
                            step={0.1}
                            value={zoom}
                            onChange={(e, zoom) => setZoom(zoom as number)}
                        />
                    </Box>
                    <Box>
                        <Typography>Rotation: {rotation + '°'}</Typography>
                        <Slider
                            valueLabelDisplay="auto"
                            min={0}
                            max={360}
                            value={rotation}
                            onChange={(e, rotation) => setRotation(rotation as number)}
                        />
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        gap: 2,
                        flexWrap: 'wrap',
                    }}
                >
                    <Button
                        variant="outlined"
                        startIcon={<Cancel />}
                        onClick={() => setOpenCrop(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<CropIcon />}
                        onClick={cropImage}
                    >
                        Crop
                    </Button>
                </Box>
            </DialogActions>
        </>
    );
};

export default CropEasy;

const zoomPercent = (value: number) => {
    return `${Math.round(value * 100)}%`;
};
