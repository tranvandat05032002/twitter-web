import { Box, DialogActions, DialogContent, Slider } from "@mui/material";
import Cropper from 'react-easy-crop';
import getCroppedImg from "@/utils/cropImage";
import React from "react";
import { ICropImage, ICroppedPixels } from "@/types/imageTypes";
import { StickyNav } from "..";
import { BackIcon, MinusIcon, PlusIcon } from "@/components/SingleUseComponents/Icon";
import { SecondaryButton } from "../Button";
import HeaderModalEdit from "../Modal/HeaderModalEdit";
import { useProfileStore } from "@/store/useProfile";
import { uploadImageToS3 } from "@/utils/handlers";
interface ICropEasy {
    photoURL: string | null;
    setOpenCrop: any;
    setPhotoURL: any;
    setFile: any
}
const CropEasy = ({ photoURL, setOpenCrop, setPhotoURL, setFile }: ICropEasy): JSX.Element | null => {
    const { userProfile } = useProfileStore(
        (state) => state
    );
    const [crop, setCrop] = React.useState({ x: 0, y: 0 });
    const [zoom, setZoom] = React.useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = React.useState<ICroppedPixels | null>(null);

    if (!photoURL) return null;
    const cropComplete = (croppedArea: any, croppedAreaPixels: ICroppedPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };

    const handleCropImage = async () => {
        try {
            const { file, url } = await getCroppedImg(
                photoURL,
                croppedAreaPixels,
            ) as ICropImage;
            setFile(file);
            const media = await uploadImageToS3(file, "avatar", "avatar")
            setPhotoURL(media?.url);
            setOpenCrop(false);
        } catch (error) {
            throw (error)
        }
    };
    const handleBackPage = () => {
        setOpenCrop(false)
        setPhotoURL(userProfile.avatar)
    }
    return (
        <div className="max-w-[600px] w-[600px] bg-black max-h-[650px] h-[650px] rounded-2xl pb-4 overflow-hidden">
            <HeaderModalEdit title="Edit media" eventTitle="Apply" eventButton={handleCropImage} iconType={{ type: "open", eventIcon: handleBackPage }}></HeaderModalEdit>
            <DialogContent
                dividers
                sx={{
                    background: '#333',
                    position: 'relative',
                    height: 546,
                    width: 'auto',
                    minWidth: { sm: 500 },
                }}
            >
                <Cropper
                    image={photoURL}
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
                    onZoomChange={setZoom}
                    onCropChange={setCrop}
                    onCropComplete={cropComplete}
                />
            </DialogContent>
            <DialogActions sx={{ flexDirection: 'column' }}>
                <Box sx={{ width: '60%', mb: 1 }}>
                    <div className="flex justify-center items-center gap-x-[20px]">
                        <MinusIcon className="w-[30px] h-[30px] mr-[3px] text-white"></MinusIcon>
                        <Slider
                            sx={{ color: "#1d9bf0" }}
                            valueLabelDisplay="auto"
                            valueLabelFormat={zoomPercent}
                            min={1}
                            max={3}
                            step={0.1}
                            value={zoom}
                            onChange={(e, zoom) => setZoom(zoom as number)}
                        />
                        <PlusIcon className="w-[30px] h-[30px] text-white"></PlusIcon>
                    </div>
                </Box>
            </DialogActions>
        </div>
    );
};

export default CropEasy;

const zoomPercent = (value: number) => {
    return `${Math.round(value * 100)}%`;
};
