const redirectBlog = (req, res, next) => {
  if (req.headers.host === 'blog.smooth-code.com') {
    res.redirect(301, `https://www.smooth-code.com${req.url}`)
    return
  }

  next()
}

export default redirectBlog
