let currentId = 0
const components = {}

export const trackComponent = component => {
  const id = currentId
  components[id] = component
  currentId += 1
  return id
}

export const getComponent = id => components[id]
