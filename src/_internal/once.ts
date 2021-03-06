

export function once(fn) {
  const cache = new Map()
  return (axios) => {
    if (cache.get(axios)) {
      return
    }
    cache.set(axios, true)
    fn(axios)

    return () => cache.delete(axios)
  }
}
