export const clUrl = (publicId, options) =>
  `//res.cloudinary.com/smooth-code/image/upload/q_auto,f_auto/${options
    ? `${options}/`
    : ''}${publicId}`
