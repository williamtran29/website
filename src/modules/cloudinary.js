export const clUrl = (
  publicId,
  options,
  format,
  defaultOptions = 'q_auto,f_auto',
) =>
  `//res.cloudinary.com/smooth/image/upload/${!format
    ? defaultOptions ? `${defaultOptions}/` : ''
    : ''}${options ? `${options}/` : ''}v1497970667/${publicId}${format
    ? `.${format}`
    : ''}`

export const absClUrl = (publicId, options, format) =>
  `https:${clUrl(publicId, options, format)}`
