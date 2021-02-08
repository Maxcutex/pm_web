// // import defProfileImage from '../assets/images/mealdef.gif';
// import { upload } from './cloudinary'
// export const validateAddProfileImage = (image) => {
//   const exts = ['image/jpg', 'image/jpeg', 'image/png'];

//   if (!(image instanceof File) || !exts.includes(image.type)) {
//     return 'Image should be in JPEG or PNG format';
//   }

//   return true;
// };

// export const profileImageUpload = (file, dataurl, callback) => {
//   if (file instanceof File) {
//     return upload(dataurl)
//       .then((payload) => callback(null, payload.secure_url))
//       .catch((error) => callback(error, null));
//   }

//   return callback(null, dataurl);
// };

// // export const defaultProfileImage = defProfileImage;