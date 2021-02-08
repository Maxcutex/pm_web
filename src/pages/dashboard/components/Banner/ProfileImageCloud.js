import React, { useState } from 'react';
import { Image, Video, Transformation, CloudinaryContext } from 'cloudinary-react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import {
  Dialog, DialogActions,
  DialogContent, DialogTitle, Button
} from '@material-ui/core';


const ProfileImageCloud = ({ id }) => {
  // static contextType = CloudinaryContext.contextType;
  const [open, setOpen] = useState(false);
  const fullWidth = true;
  const maxWidth = 'md';
  const onPhotoUploadProgress = (id, fileName, progress) => {
    this.props.onUpdateUploadedPhoto({
      id: id,
      fileName: fileName,
      progress: progress,
    });
  }

  const onPhotoUploaded = (id, fileName, response) => {
    // this.props.onUpdateUploadedPhoto({
    //     id: id,
    //     fileName: fileName,
    //     response: response,
    // });

    // onPhotosUploaded([response.body]);
  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const onPhotoSelected = (files) => {
    const url = `https://api.cloudinary.com/v1_1/${
      this.context.cloudName
      }/upload`;
    const title = this.titleEl.value;

    for (let file of files) {
      const photoId = this.photoId++;
      const fileName = file.name;
      request.post(url)
        .field('upload_preset', this.context.uploadPreset)
        .field('file', file)
        .field('multiple', true)
        .field('tags', title ? `myphotoalbum,${title}` : 'myphotoalbum')
        .field('context', title ? `photo=${title}` : '')
        .on('progress', (progress) => this.onPhotoUploadProgress(photoId, file.name, progress))
        .end((error, response) => {
          onPhotoUploaded(photoId, fileName, response);
        });
    }
  }

  return (<div>
    <div>Image To View</div>
    <div onClick={handleClickOpen}>Edit Image</div>
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth={maxWidth} fullWidth={fullWidth}>
      <DialogTitle id="form-dialog-title">Update Image </DialogTitle>
      <DialogContent>
        <div>
          <Dropzone
            id="direct-upload-dropzone"
            disableClick={true}
            multiple={false}
            accept="image/*"
            style={{ position: 'relative' }}
          // onDrop={onPhotoSelected.bind(this)}
          >
            <div id="direct_upload">
              <h1>New Photo</h1>
              <h2>
                Direct upload from the browser with React File
                Upload
                        </h2>
              <p>
                You can also drag and drop an image file into the
                dashed area.
                        </p>
              <form>
                <div className="form_line">
                  <label path="title">Title:</label>
                  <div className="form_controls">
                    <input
                      type="text"
                      ref={titleEl =>
                        (this.titleEl = titleEl)
                      }
                      className="form-control"
                      placeholder="Title"
                    />
                  </div>
                </div>
                <div className="form_line">
                  <label>Image:</label>
                  <div className="form_controls">
                    <div className="upload_button_holder">
                      <label
                        className="upload_button"
                        htmlFor="fileupload"
                      >
                        Upload
                                        </label>
                      <input
                        type="file"
                        id="fileupload"
                        accept="image/*"
                        multiple="multiple"
                        ref={fileInputEl =>
                          (this.fileInputEl = fileInputEl)
                        }
                        onChange={() =>
                          onPhotoSelected(
                            this.fileInputEl.files
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
              </form>
              <h2>Status</h2>
            </div>

          </Dropzone>


        </div>




      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>

      </DialogActions>
    </Dialog>
  </div>);
}

export default ProfileImageCloud;