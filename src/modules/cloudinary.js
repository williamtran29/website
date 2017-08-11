export const clUrl = (publicId, options, format) =>
  `//res.cloudinary.com/smooth/image/upload/${!format
    ? 'q_auto,f_auto/'
    : ''}${options ? `${options}/` : ''}v1497970667/${publicId}${format
    ? `.${format}`
    : ''}`
