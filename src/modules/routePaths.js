export const homeRoute = () => '/'
export const contactRoute = () => '/contact'
export const trainingPrintRoute = slug => `/formations/${slug}/print`
export const sessionRoute = (trainingSlug, date, city, sessionId) =>
  `/formation-${trainingSlug}/${date}-${city}-${sessionId}`
export const trainerRoute = slug => `/formateurs/${slug}`
export const articlesRoute = () => '/articles'
export const articleRoute = slug => `/articles/${slug}`
export const testimonialsRoute = () => '/references'
export const conditionsRoute = () => '/conditions-generales/'
export const legalNoticeRoute = () => '/mention-legales/'
