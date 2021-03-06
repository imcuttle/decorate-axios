

export function once(fn) {
  const cache = new Map()
  return (axios) => {
    if (cache.get(axios)) {
      return
    }
    cache.set(axios, true)
    return fn(axios)
  }
}
