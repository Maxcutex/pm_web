// // import cloudinary from 'cloudinary';
// var cloudinary = require('cloudinary').v2;

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
//   cloudinary_url: process.env.CLOUDINARY_URL
// });

// const { uploader } = cloudinary;

// export const upload = (image) => (
//   new Promise((resolve, reject) => {
//     uploader.upload(image, (error, payload) => {
//       if (error) {
//         reject(error);
//       } else {
//         resolve(payload);
//       }
//     });
//   })
// );

// export default cloudinary;
