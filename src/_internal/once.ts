

const cache = new Map()
export function once(fn, key: string) {
  return (axios: any) => {
    const map: Map<any, any> = cache.get(key) || new Map()
    cache.set(key, map)

    if (map.get(axios)) {
      return
    }
    map.set(axios, true)
    fn(axios)

    return () => {
      map.delete(axios)
      if (!map.size) {
        cache.delete(key)
      }
    }
  }
}
