import React, { useState } from 'react';
import ReactCrop from 'react-image-crop'


import useStyles from '../../styles'
import 'react-image-crop/dist/ReactCrop.css'
import classnames from "classnames";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import {
  TextField, Dialog, DialogActions,
  DialogContent, DialogContentText, DialogTitle, Button
} from '@material-ui/core';


const ProfileImage = () => {
  const fullWidth = true;
  const maxWidth = 'sm';
  var classes = useStyles();
  const [open, setOpen] = useState(false);
  const [fileUpload, setFileUpload] = useState(null);
  const [fileUrl, setFileUrl] = useState('');
  const [src, setSrc] = useState('');
  const [imageRef, setImageRef] = useState(null);
  const [crop, setCrop] = useState({
    unit: "%",
    width: 30,
    aspect: 1 / 1
  });
  const [profile_pic, setProfilePic] = useState('');
  const [croppedImageUrl, setCroppedImageUrl] = useState('');
  const [croppedImage, setCroppedImage] = useState('');

  const onImageLoaded = image => {
    // this.imageRef = image
    setImageRef(image)
  }

  const onCropChange = (crop) => {
    // this.setState({ crop });
    setCrop(crop)
  }

  const onCropComplete = crop => {
    if (imageRef && crop.width && crop.height) {
      const croppedImageUrl1 = getCroppedImg(imageRef, crop)
      setCroppedImageUrl(croppedImageUrl1)
      // this.setState({ croppedImageUrl })
      console.log("image cropped url", croppedImageUrl1)
    }
  }

  const getCroppedImg = (image, crop) => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    )

    const reader = new FileReader()
    canvas.toBlob(blob => {
      reader.readAsDataURL(blob)
      reader.onloadend = () => {
        dataURLtoFile(reader.result, 'cropped.jpg')
      }
    })
  }
  const dataURLtoFile = (dataurl, filename) => {
    let arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    let croppedImage = new File([u8arr], filename, { type: mime });
    // this.setState({ croppedImage: croppedImage })
    setCroppedImage(croppedImage)
  }
  const handleCapture = (e) => {
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      setSrc(fileReader.result)
    }
    fileReader.readAsDataURL(e.target.files[0])

  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const uploadProfileImage = () => {

    const formData = new FormData();

    formData.append("file", fileUpload);
  }
  const preview = fileUrl ? <img src={fileUrl} alt='preview' /> : null

  return (<div>
    <div>Image To View</div>
    <div onClick={handleClickOpen}>Edit Image</div>
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth={maxWidth} fullWidth={fullWidth}>
      <DialogTitle id="form-dialog-title">Update Image </DialogTitle>
      <DialogContent>
        <div style={{ display: "flex" }}>
          <div style={{ display: "flex" }} className={classnames(classes.formTextDiv)}>
            <div><IconButton color="primary" component="span">
              <PhotoCamera />
            </IconButton></div>
            <div><input
              accept="image/*"
              className={classes.input}
              id="icon-button-photo"
              onChange={handleCapture}
              type="file" value={profile_pic}
            /></div>




          </div>
          <div className={classnames(classes.formTextDiv)}>{src && (
            <ReactCrop
              src={src}
              crop={crop}
              onImageLoaded={onImageLoaded}
              onComplete={onCropComplete}
              onChange={onCropChange}
            />
          )}</div>
        </div>





      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
                    </Button>
        {/* <Button onClick={() => submitData(userSummary.id)} color="primary">
          {action}
        </Button> */}
        <Button
          variant="contained"
          color="default"
          className={classes.button}
          startIcon={<CloudUploadIcon />}
        ></Button>
      </DialogActions>
    </Dialog>
  </div>);
}

export default ProfileImage;