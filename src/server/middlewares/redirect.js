/* eslint-disable no-restricted-syntax */
const redirect = matchers => async (ctx, next) => {
  await next()
  for (const matcher of matchers) {
    if (ctx.request.url.match(matcher.match)) {
      ctx.status = matcher.status || 302
      ctx.redirect(matcher.redirect)
      break
    }
  }
}

export default redirect
