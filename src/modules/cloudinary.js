export const clUrl = (publicId, options) =>
  `//res.cloudinary.com/smooth/image/upload/q_auto,f_auto/${options
    ? `${options}/`
    : ''}v1497970667/${publicId}`
