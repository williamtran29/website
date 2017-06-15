export const clUrl = (publicId, options) =>
  `//res.cloudinary.com/smooth/image/upload/q_auto,f_auto/${options
    ? `${options}/`
    : ''}${publicId}`
