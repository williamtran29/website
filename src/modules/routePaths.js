export const homeRoute = () => '/'
export const contactRoute = () => '/contact'
export const trainingPrintRoute = slug => `/formation-${slug}/print`
export const trainingRoute = slug => `/formation-${slug}`
export const sessionRoute = (trainingSlug, date, city, sessionId) =>
  `/formation-${trainingSlug}/${date}-${city}-${sessionId}`
export const trainerRoute = slug => `/formateurs/${slug}`
export const latestArticlesRoute = () => `/articles`
export const articlesRoute = page => `/articles/page/${page}`
export const articleRoute = slug => `/articles/${slug}`
export const testimonialsRoute = () => '/references'
export const conditionsRoute = () => '/conditions-generales/'
export const legalNoticeRoute = () => '/mention-legales/'
