

const cache = new Map()
export function once(fn) {
  return (axios) => {
    if (cache.get(axios)) {
      return
    }
    cache.set(axios, true)
    fn(axios)

    return () => cache.delete(axios)
  }
}
