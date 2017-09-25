let retries = 0

export function initialize() {
  if (window.Intercom) {
    window.Intercom('boot', { app_id: 'ur91us5p' })
  } else if (retries < 4) {
    retries += 1
    setTimeout(initialize, 1000 * retries)
  }
}

export function update() {
  if (window.Intercom) window.Intercom('update')
}
