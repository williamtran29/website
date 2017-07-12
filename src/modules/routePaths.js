export const trainingRoute = slug => `/trainings/${slug}`
export const trainingPdfRoute = slug => `/trainings/${slug}/pdf`
export const sessionRoute = (trainingSlug, sessionId, city, month) =>
  `/trainings/${trainingSlug}/sessions/${sessionId}-${city}-${month}`
