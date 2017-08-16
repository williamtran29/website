/* eslint-disable no-restricted-syntax */
const redirect = matchers => async (ctx, next) => {
  for (const matcher of matchers) {
    if (ctx.request.url.match(matcher.match)) {
      ctx.redirect(matcher.redirect)
      break
    }
  }
  await next()
}

export default redirect
